#!/usr/bin/env bash
# brew install coreutils

gdate +'%s%3N'

gdate '2025-01-20 12:00:00' +'%s%3N'

curl "http://localhost:3000/api/health" -X "GET"

curl "http://localhost:3000/api/submit" -X "POST" -H "Content-Type: application/json" -d '{"code": "2 + 2"}'

curl "http://localhost:3000/api/epoch-to-uuid" -X "POST" -H "Content-Type: application/json" -d '{"epoch_timestamp": "1737392400000"}'

curl "http://localhost:3000/api/zettel-to-uuid" -X "POST" -H "Content-Type: application/json" -d '{"zettel_id": "202501201200"}'

curl "http://localhost:3000/api/zettel-to-uuid" -X "POST" -H "Content-Type: application/json" -d '{"zettel_id": "202501201200", "city": ""}'

curl "http://localhost:3000/api/zettel-to-uuid" -X "POST" -H "Content-Type: application/json" -d '{"zettel_id": "202501201200", "city": "reyk"}'

curl "http://localhost:3000/api/zettel-to-uuid" -X "POST" -H "Content-Type: application/json" -d '{"zettel_id": "202501201200", "city": "UTC"}'
