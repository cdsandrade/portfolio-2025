import { setupServer } from 'msw/node'
import { rest } from 'msw'

console.log('[MSW Setup] Running setup file...')

const server = setupServer(
  rest.post('http://localhost:3000/api/submit', (req, res, ctx) =>
    res(ctx.json({ message: 'Code executed successfully!', result: 'Mocked response' }))
  )
)

beforeAll(() => {
  console.log('[MSW Setup] Starting mock server...')
  server.listen()
})

afterEach(() => {
  console.log('[MSW Setup] Resetting handlers...')
  server.resetHandlers()
})

afterAll(() => {
  console.log('[MSW Setup] Closing mock server...')
  server.close()
})
