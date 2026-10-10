param(
    [string]$ZipPath = ""
)
$ErrorActionPreference = "Stop"

$project = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$zipName = "gohar-hero-video-ready.zip"
$paths = @()
if ($ZipPath) {
    $paths += $ZipPath
} else {
    $paths += (Join-Path $project $zipName)
    $paths += (Join-Path (Join-Path $env:USERPROFILE "Downloads") $zipName)
    $paths += (Join-Path (Join-Path $env:USERPROFILE "Desktop") $zipName)
}

$archive = $null
foreach ($path in $paths) {
    if (Test-Path -LiteralPath $path -PathType Leaf) {
        $archive = (Resolve-Path -LiteralPath $path).Path
        break
    }
}
if (-not $archive) {
    Write-Host "Hero video ZIP was not found." -ForegroundColor Yellow
    Write-Host "Download gohar-hero-video-ready.zip from the ChatGPT reply."
    Write-Host "Place it in Downloads or project root, then run npm run assets:install:win again."
    exit 1
}

Write-Host "Installing hero assets from $archive" -ForegroundColor Cyan
Expand-Archive -LiteralPath $archive -DestinationPath $project -Force

$required = @("gohar-hero-poster.webp","gohar-hero-720.mp4","gohar-hero-1080.mp4")
foreach ($name in $required) {
    $target = Join-Path (Join-Path $project "public\hero") $name
    if (-not (Test-Path -LiteralPath $target -PathType Leaf)) {
        throw "Missing after extract: $target"
    }
    $item = Get-Item -LiteralPath $target
    if ($item.Length -lt 5000) {
        throw "Asset is unexpectedly small: $target"
    }
    Write-Host ("OK " + $name + " (" + [math]::Round($item.Length / 1MB, 2) + " MB)") -ForegroundColor Green
}
Write-Host "Installed successfully. Run npm run assets:check, then restart npm run dev." -ForegroundColor Green
Write-Host "After confirming playback, git add public/hero and commit/push these files."
