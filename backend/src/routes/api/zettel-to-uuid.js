const { v7 } = require('uuid')
const { zettel_to_epoch } = require('../../lib/utils')

module.exports = async (fastify) => {
  fastify.post('/zettel-to-uuid', {
    schema: {
      body: {
        type: 'object',
        properties: {
          zettel_id: { type: 'string' },
          city: { type: 'string' }
        }
      }
    },
    handler: async (request, reply) => {
      try {
        const { zettel_id, city } = request.body
        
  
        if (zettel_id) {
          return { message: 'UUID generated successfully with Zettel ID!', uuid: v7({ msecs: zettel_to_epoch(zettel_id, city) }) }
        } else {
          return { message: 'UUID generated successfully!', uuid: v7({ msecs: Date.now(), city }) }
        }
      } catch (err) {
        return reply.code(400).send({ error: `Execution failed: ${err.message}` })
      }
    }
  })
}
