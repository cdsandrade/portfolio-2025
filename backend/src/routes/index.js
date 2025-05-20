module.exports = async (fastify) => {
  fastify.register(require('./api'), { prefix: '/api' })
}
