const test = require('tape')

test('POST /zettel-to-uuid returns valid UUID', async (t) => {
  const response = await fetch('http://localhost:3000/api/zettel-to-uuid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ zettel_id: '202501201200' })
  })
  const data = await response.json()

  t.equal(response.status, 200, 'Should return HTTP 200')
  t.ok(data.uuid, 'Response should include a UUID')
  t.match(data.uuid, /^019484a8-2680-7/, 'Response should begin with proper timestamp')
  t.end()
})

test('POST /zettel-to-uuid returns valid UUID with empty city', async (t) => {
  const response = await fetch('http://localhost:3000/api/zettel-to-uuid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      zettel_id: '202501201200',
      city: ''
    })
  })
  const data = await response.json()

  t.equal(response.status, 200, 'Should return HTTP 200')
  t.ok(data.uuid, 'Response should include a UUID')
  t.match(data.uuid, /^019484a8-2680-7/, 'Response should begin with proper timestamp')
  t.end()
})

test('POST /zettel-to-uuid returns valid UUID for Reykjavik', async (t) => {
  const response = await fetch('http://localhost:3000/api/zettel-to-uuid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      zettel_id: '202501201200',
      city: 'Reykjavik'
    })
  })
  const data = await response.json()

  t.equal(response.status, 200, 'Should return HTTP 200')
  t.ok(data.uuid, 'Response should include a UUID')
  t.match(data.uuid, /^01948395-7e00-7/, 'Response should begin with proper timestamp')
  t.end()
})

test('POST /zettel-to-uuid returns valid UUID for UTC', async (t) => {
  const response = await fetch('http://localhost:3000/api/zettel-to-uuid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      zettel_id: '202501201200',
      city: 'UTC'
    })
  })
  const data = await response.json()

  t.equal(response.status, 200, 'Should return HTTP 200')
  t.ok(data.uuid, 'Response should include a UUID')
  t.match(data.uuid, /^01948395-7e00-7/, 'Response should begin with proper timestamp')
  t.end()
})

test('POST /zettel-to-uuid returns UTC on invalid city', async (t) => {
  const response = await fetch('http://localhost:3000/api/zettel-to-uuid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      zettel_id: '202501201200',
      city: 'madeup'
    })
  })
  const data = await response.json()

  t.equal(response.status, 200, 'Should return HTTP 200')
  t.ok(data.uuid, 'Response should include a UUID')
  t.match(data.uuid, /^01948395-7e00-7/, 'Response should return UTC timestamp')
  t.end()
})
