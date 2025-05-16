const fastify = require('fastify')({ logger: true });
const { VM } = require('vm2');
const util = require('util');

const { v7 } = require('uuid')
// import { v7 } from 'uuid';


fastify.post('/uuidv7', {
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
      let uuid

      if (epoch_timestamp) {
        uuid = v7({ msecs: epoch_timestamp })
      } else {
        uuid = v7({ msecs: Date.now() })
      }

      return { message: 'UUID generated successfully!', uuid }
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
        // console: { log: (...args) => fastify.log.info('[Sandbox]', ...args) },
        // console: { log: (...args) => fastify.log.info('[Sandbox]', ...args.join(' ')) },
        console: { log: (...args) => fastify.log.info('[Sandbox] ' + util.format(...args)) },
        // console: { log: (...args) => fastify.log.info('[Sandbox]', 'foo', 'bar') },
        // getEnvVar: (name) => process.env[name], // BAD IDEA: Demo only!
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

// ---

// const PORT = 3000

// const start = async () => {
//   try {
//     await fastify.listen(PORT)
//   } catch(err) {
//     fastify.log.error(err)
//     process.exit(1)
//   }
// }

// start()
