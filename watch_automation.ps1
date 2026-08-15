param(
    [int]$RefreshSeconds = 0
)

# Live view of output/status.json + output/progress.log + recently changed project files.
# Read-only: never modifies status.json. Ctrl+C to stop.

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$ConfigPath = Join-Path $Root "automation_config.json"
$Config = Get-Content $ConfigPath -Raw | ConvertFrom-Json

if ($RefreshSeconds -le 0) {
    $ReportConfigPath = Join-Path $Root "report_config.json"
    if (Test-Path $ReportConfigPath) {
        $ReportConfig = Get-Content $ReportConfigPath -Raw | ConvertFrom-Json
        $RefreshSeconds = $ReportConfig.watch_refresh_seconds
    }
    if (-not $RefreshSeconds) { $RefreshSeconds = 5 }
}

$StatusFile = Join-Path $Root $Config.status_file
$ProgressLog = Join-Path $Root $Config.progress_log

while ($true) {
    Clear-Host
    Write-Host "=== $($Config.project_name) — automation watch ===" -ForegroundColor Cyan
    Write-Host "Refreshing every $RefreshSeconds s. Ctrl+C to stop.`n"

    if (Test-Path $StatusFile) {
        $Status = Get-Content $StatusFile -Raw | ConvertFrom-Json
        Write-Host "Status generated: $($Status.generated_at)`n"

        $counts = @{}
        foreach ($s in $Status.steps) {
            if (-not $counts.ContainsKey($s.state)) { $counts[$s.state] = 0 }
            $counts[$s.state] += 1

            $color = switch ($s.state) {
                "completed"   { "Green" }
                "running"     { "Yellow" }
                "failed"      { "Red" }
                "interrupted" { "Red" }
                default       { "Gray" }
            }
            $dur = if ($s.duration_human) { $s.duration_human } else { "-" }
            $rc = if ($null -ne $s.return_code) { $s.return_code } else { "-" }
            Write-Host ("  [{0,-11}] {1}  {2,-40} dur={3,-10} rc={4}" -f $s.state, $s.step_id, (Split-Path -Leaf $s.prompt_file), $dur, $rc) -ForegroundColor $color
        }

        Write-Host "`nSummary:" ($counts.Keys | ForEach-Object { "$_=$($counts[$_])" }) -join ", "
    } else {
        Write-Host "No status.json yet — run 'python run_claude_prompts.py --status' once to initialize." -ForegroundColor Yellow
    }

    if (Test-Path $ProgressLog) {
        Write-Host "`n--- Recent progress.log ---"
        Get-Content $ProgressLog -Tail 10
    }

    Write-Host "`n--- Recently changed project files ---"
    Get-ChildItem -Path $Root -Recurse -File -ErrorAction SilentlyContinue |
        Where-Object { $_.FullName -notmatch '\\node_modules\\' -and $_.FullName -notmatch '\\\.git\\' } |
        Sort-Object LastWriteTime -Descending |
        Select-Object -First 10 |
        ForEach-Object { Write-Host ("  {0:yyyy-MM-dd HH:mm:ss}  {1}" -f $_.LastWriteTime, $_.FullName.Substring($Root.Length + 1)) }

    Start-Sleep -Seconds $RefreshSeconds
}
