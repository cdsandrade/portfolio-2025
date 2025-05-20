const { v7 } = require('uuid')

module.exports = async (fastify) => {
  fastify.post('/epoch-to-uuid', {
    schema: {
      body: {
        type: 'object',
        properties: {
          epoch_timestamp: { type: 'string' }
        }
      }
    },
    handler: async (request, reply) => {
      try {
        const { epoch_timestamp } = request.body
  
        if (epoch_timestamp) {
          return { message: 'UUID generated successfully with Epoch timestamp!', uuid: v7({ msecs: epoch_timestamp }) }
        } else {
          return { message: 'UUID generated successfully!', uuid: v7({ msecs: Date.now() }) }
        }
      } catch (err) {
        return reply.code(400).send({ error: `Execution failed: ${err.message}` })
      }
    }
  })
}
