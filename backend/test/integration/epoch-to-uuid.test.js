const test = require('tape')

test('POST /epoch-to-uuid returns valid UUID', async (t) => {
  const response = await fetch('http://localhost:3000/epoch-to-uuid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ epoch_timestamp: '1737392400000' })
  })
  const data = await response.json()

  t.equal(response.status, 200, 'Should return HTTP 200')
  t.ok(data.uuid, 'Response should include a UUID')
  t.match(data.uuid, /^019484a8-2680-7/, 'Response should begin with proper timestamp')
  t.end()
})

test('POST /epoch-to-uuid returns valid UUID', async (t) => {
  const response = await fetch('http://localhost:3000/epoch-to-uuid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ epoch_timestamp: '1737374400000' })
  })
  const data = await response.json()

  t.equal(response.status, 200, 'Should return HTTP 200')
  t.ok(data.uuid, 'Response should include a UUID')
  t.match(data.uuid, /^01948395-7e00-7/, 'Response should begin with proper timestamp')
  t.end()
})
