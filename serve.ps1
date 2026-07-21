$prefix = 'http://localhost:8000/'
$root = Get-Location
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Host "Serving $prefix from $root"
try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $req = $context.Request
        $res = $context.Response
        $rawUrl = $req.RawUrl.TrimStart('/')
        if ([string]::IsNullOrEmpty($rawUrl)) { $rawUrl = 'index.html' }
        $localPath = Join-Path $root $rawUrl
        if (-not (Test-Path $localPath)) {
            $res.StatusCode = 404
            $body = "404 Not Found"
            $buf = [System.Text.Encoding]::UTF8.GetBytes($body)
            $res.OutputStream.Write($buf, 0, $buf.Length)
            $res.Close()
            continue
        }
        $bytes = [System.IO.File]::ReadAllBytes($localPath)
        switch ([System.IO.Path]::GetExtension($localPath).ToLower()) {
            '.css' { $res.ContentType = 'text/css' }
            '.js' { $res.ContentType = 'application/javascript' }
            '.png' { $res.ContentType = 'image/png' }
            '.jpg' { $res.ContentType = 'image/jpeg' }
            '.jpeg' { $res.ContentType = 'image/jpeg' }
            '.svg' { $res.ContentType = 'image/svg+xml' }
            '.json' { $res.ContentType = 'application/json' }
            default { $res.ContentType = 'text/html' }
        }
        $res.ContentLength64 = $bytes.Length
        $res.OutputStream.Write($bytes, 0, $bytes.Length)
        $res.OutputStream.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
