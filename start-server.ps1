# Start Laravel server using D:\php\php.exe (has SQLite driver)
# Use this so the correct PHP is always used regardless of PATH.
$php = "D:\php\php.exe"
if (-not (Test-Path $php)) {
  Write-Host "ERROR: PHP not found at $php" -ForegroundColor Red
  exit 1
}
Set-Location $PSScriptRoot
Write-Host "Starting server with $php at http://127.0.0.1:8000" -ForegroundColor Cyan
& $php artisan serve
