import config from './config'
import { Server } from './server'
import { user } from './model/user';

const server = new Server()
server.configure(config).then(() => {
    
})
server.start(config.port)


process.on('SIGINT', () => {
    server.stop()
    process.exit(0)
})
