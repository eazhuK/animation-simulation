param(
    [int]$RefreshSeconds = 0,
    [switch]$OpenInBrowser
)

# Periodically regenerates output/automation_report.{md,html,pdf} and prints where they are.
# Ctrl+C to stop.

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$ReportConfigPath = Join-Path $Root "report_config.json"
$ReportConfig = Get-Content $ReportConfigPath -Raw | ConvertFrom-Json

if ($RefreshSeconds -le 0) {
    $RefreshSeconds = $ReportConfig.watch_refresh_seconds
    if (-not $RefreshSeconds) { $RefreshSeconds = 5 }
}

$HtmlPath = Join-Path $Root $ReportConfig.output_html
$Opened = $false

while ($true) {
    Clear-Host
    Write-Host "=== $($ReportConfig.project_name) — report watch ===" -ForegroundColor Cyan
    Write-Host "Refreshing every $RefreshSeconds s. Ctrl+C to stop.`n"

    python (Join-Path $Root "generate_automation_report.py")

    if (Test-Path $HtmlPath) {
        Write-Host "`nLatest report: $HtmlPath"
        Write-Host "Last updated: $((Get-Item $HtmlPath).LastWriteTime)"
        if ($OpenInBrowser -and -not $Opened) {
            Start-Process $HtmlPath
            $Opened = $true
        }
    }

    Start-Sleep -Seconds $RefreshSeconds
}
