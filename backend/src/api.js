const fastify = require('fastify')({
  logger: true,
  ajv: {
    customOptions: {
      jsonPointers: true,
      // ⚠ Warning: Enabling this option may lead to this security issue https://www.cvedetails.com/cve/CVE-2020-8192/
      allErrors: true
    },
    plugins: [
      require('ajv-errors')
    ]
  }
})
const cors = require('@fastify/cors')

// Register CORS
fastify.register(cors, {
  // origin: ['http://localhost:5173'],
  origin: true, // or explicitly ['http://localhost:5173'] if you want to lock it down
  // credentials: true // if you're using cookies or Authorization headers
})

// Use route aggregator
fastify.register(require('./routes'))

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`Server running at ${address}`)
})
