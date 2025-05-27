const port = process.env.VITE_PORT || 4173

export default {
  ci: {
    collect: {
      url: [`http://localhost:${port}`],
      startServerCommand: 'npm run preview',
      startServerReadyPattern: `localhost:${port}`,
    },
    assert: {
      preset: 'lighthouse:recommended'
    }
  }
}
