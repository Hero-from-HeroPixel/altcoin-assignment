
import { debug } from 'console'
import app from './app.ts'
import config from './config/app.config.ts'

//*Instantiate the server
const server = app.listen(config.port, () => {
    console.log(`Backend listening on port ${config.port}`)
})


//* Graceful shutdown of server
//https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html
process.on('SIGTERM', () => {
    debug('SIGTERM signal received: closing server')
    server.close(() => debug('HTTP Server closed'))
    process.exit()
})
