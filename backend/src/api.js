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

// Use route aggregator
fastify.register(require('./routes'))

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`Server running at ${address}`)
})
