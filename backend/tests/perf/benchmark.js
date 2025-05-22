const autocannon = require('autocannon');

const [,, url, method, headersJson, body, connections, duration] = process.argv;
const headers = JSON.parse(headersJson);

(async () => {
  console.log(`-> ${method} ${url}`);
  const result = await autocannon({
    url,
    method: method || 'GET',
    connections: connections || 100,
    duration: duration || 10,
    headers: headers || undefined,
    body: body || undefined
  });

  console.log(`✅ ${url} -> avg throughput: ${result.throughput.average} req/sec`);
  if (result.throughput.average < 500) {
    throw new Error('❌ Performance too low!');
  }
})()
