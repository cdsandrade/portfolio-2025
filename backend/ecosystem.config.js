module.exports = {
  apps: [{
    name: "api-app",
    script: "./index.js",
    watch: true,
    watch_delay: 1000,
    ignore_watch: [ "node_moodules", "test", "logs", ".git", ".github" ],
    env: {
      NODE_ENV: "development"
    }
  }]
}