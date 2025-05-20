([DateTimeOffset]::UtcNow).ToUnixTimeMilliseconds()

([DateTimeOffset]'2025-01-20 12:00:00').ToUnixTimeMilliseconds()

(Invoke-WebRequest -Uri "http://localhost:3000/api/health" -Method "GET").Content

(Invoke-WebRequest -Uri "http://localhost:3000/api/submit" -Method "POST" -Headers @{ "Content-Type" = "application/json" } -Body '{"code": "2 + 2"}').Content

(Invoke-WebRequest -Uri "http://localhost:3000/api/epoch-to-uuid" -Method "POST" -Headers @{ "Content-Type" = "application/json" } -Body '{"epoch_timestamp": "1737392400000"}').Content

(Invoke-WebRequest -Uri "http://localhost:3000/api/zettel-to-uuid" -Method "POST" -Headers @{ "Content-Type" = "application/json" } -Body '{"zettel_id": "202501201200"}').Content

(Invoke-WebRequest -Uri "http://localhost:3000/api/zettel-to-uuid" -Method "POST" -Headers @{ "Content-Type" = "application/json" } -Body '{"zettel_id": "202501201200", "city": ""}').Content

(Invoke-WebRequest -Uri "http://localhost:3000/api/zettel-to-uuid" -Method "POST" -Headers @{ "Content-Type" = "application/json" } -Body '{"zettel_id": "202501201200", "city": "reyk"}').Content

(Invoke-WebRequest -Uri "http://localhost:3000/api/zettel-to-uuid" -Method "POST" -Headers @{ "Content-Type" = "application/json" } -Body '{"zettel_id": "202501201200", "city": "UTC"}').Content
