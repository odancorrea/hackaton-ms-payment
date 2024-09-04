import 'dotenv/config'
import dataSource from './adapter/driver/infra/data-source'
import server from './adapter/driven/server/server'
import queue from './adapter/driver/queue/queue'

const bootstrap = async () => {
    queue.init()
    await dataSource.init()
    await server.init()
}

bootstrap()
