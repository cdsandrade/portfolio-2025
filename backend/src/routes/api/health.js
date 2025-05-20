module.exports = async (fastify) => {
  fastify.get('/health', async () => ({ status: 'ok' }))
}
