const fastify = require('fastify')({ logger: true });
const { VM } = require('vm2');
const util = require('util');

const { v7 } = require('uuid')
const { zettel_to_epoch } = require('./lib/utils')

fastify.get('/health', async () => ({ status: 'ok' }));

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
      const { epoch_timestamp } = request.body;

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
      const { zettel_id, city } = request.body;
      

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
    const { code } = request.body;

    // Example of safe globals (read-only Math, mock console)
    const vm = new VM({
      timeout: 1000,
      sandbox: {
        Math,
        console: { log: (...args) => fastify.log.info('[Sandbox] ' + util.format(...args)) },
      },
    });

    try {
      const result = vm.run(code);
      return { message: 'Code executed successfully!', result };
    } catch (err) {
      return reply.code(400).send({ error: `Execution failed: ${err.message}` });
    }
  },
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server running at ${address}`);
});
