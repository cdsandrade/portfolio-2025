const autocannon = require('autocannon')

// Promisify autocannon instance for the await needed for results + throw
const run = (opts) => new Promise((resolve, reject) => {
  const instance = autocannon(opts, (err, res) => {
    if (err) return reject(err)
    resolve(res)
  })

  autocannon.track(instance)

  process.once('SIGINT', () => instance.stop())
})

;(async () => {
  const [,, url, method, headersJson, body, connections, duration] = process.argv
  const headers = JSON.parse(headersJson)

  console.log(`-> ${method} ${url}`)
  const result = await run({
    url,
    method: method || 'GET',
    headers: headers || undefined,
    body: body || undefined,
    connections: Number(connections) || 100,
    duration: Number(duration) || 10,
  })

  console.log(`✅ ${url} -> avg throughput: ${result.throughput.average} req/sec`)
  if (result.throughput.average < 500) {
    throw new Error('❌ Performance too low!')
  }
})()
