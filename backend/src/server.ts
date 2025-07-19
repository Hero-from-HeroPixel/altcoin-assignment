
import app from './app.ts'
import config from './config/app.ts'

app.listen(config.port, () => {
    console.log(`Backend listening on port ${config.port}`)
})
