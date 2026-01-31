import express from 'express'
import cors from 'cors'
import { router } from './routes'
const server = express()

server.use(cors())
server.use(express.json())

server.use('/api', router)

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Running: http://localhost:${PORT}`)
})