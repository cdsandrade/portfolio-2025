const { VM } = require('vm2')
const util = require('util')

module.exports = async (fastify) => {
  fastify.post('/submit', {
    schema: {
      body: {
        type: 'object',
        required: ['code'],
        properties: {
          code: { type: 'string', minLength: 1 },
        },
      },
    },
    handler: async (request, reply) => {
      const { code } = request.body
  
      // Example of safe globals (read-only Math, mock console)
      const vm = new VM({
        timeout: 1000,
        sandbox: {
          Math,
          console: { log: (...args) => fastify.log.info('[Sandbox] ' + util.format(...args)) },
        },
      })
  
      try {
        const result = vm.run(code)
        return { message: 'Code executed successfully!', result }
      } catch (err) {
        return reply.code(400).send({ error: `Execution failed: ${err.message}` })
      }
    },
  })
}
