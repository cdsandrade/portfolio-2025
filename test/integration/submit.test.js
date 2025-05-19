const test = require('tape');

test('POST /epoch-to-uuid returns valid UUID', async (t) => {
  const response = await fetch('http://localhost:3000/epoch-to-uuid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ epoch_timestamp: '1727287830000' })
  })

  const data = await response.json();
  t.equal(response.status, 200, 'Should return HTTP 200')
  t.ok(data.uuid, 'Response should include a UUID')
  t.end()
})
