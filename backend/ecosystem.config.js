module.exports = {
  apps: [{
    name: "api",
    script: "./src/api.js",
    watch: true,
    watch_delay: 1000,
    ignore_watch: [ "node_modules", "test", "logs", ".git", ".github" ],
    env: {
      NODE_ENV: "development"
    }
  }]
}
