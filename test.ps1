$body = '{"type":1}'
try {
    $response = Invoke-WebRequest -Uri "https://discord-task-bot-1063692848202.asia-northeast1.run.app/interactions" `
      -Method Post `
      -ContentType "application/json" `
      -Body $body
    $response.StatusCode
    $response.Content
} catch {
    $_.Exception.Response.StatusCode
    $_.ErrorDetails.Message
}