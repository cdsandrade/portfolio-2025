module.exports = async (fastify) => {
  fastify.register(require('./health'))
  fastify.register(require('./submit'))
  fastify.register(require('./epoch-to-uuid'))
  fastify.register(require('./zettel-to-uuid'))
}
