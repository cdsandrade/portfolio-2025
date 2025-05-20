const test = require('tape')

test('POST /submit returns ...', async (t) => {
  const response = await fetch('http://localhost:3000/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ code: '2 + 2' })
  })

  const data = await response.json()
  t.equal(response.status, 200, 'Should return HTTP 200')
  t.ok(data.result, 'Response should include a result')
  t.deepEquals(data.result, 4, 'Response should return the proper result')
  t.end()
})
