/**
 * Entry point for starting the Express backend server.
 *
 * Responsibilities:
 * - Imports the application instance and configuration settings
 * - Starts the HTTP server on the configured port
 * - Logs server startup confirmation
 * - Handles graceful shutdown on SIGTERM signals to ensure cleanup
 *
 * Related Docs:
 * - Express graceful shutdown: https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html
 */
import { debug } from 'console'
import app from './app.ts'
import config from './config/app.config.ts'

// Instantiate and start the HTTP server
const server = app.listen(config.port, () => {
    console.log(`Backend listening on port ${config.port}`)
})

// Gracefully handle termination signals for clean server shutdown
process.on('SIGTERM', () => {
    debug('SIGTERM signal received: closing server')
    server.close(() => {
        debug('HTTP Server closed')
        process.exit()
    })
})