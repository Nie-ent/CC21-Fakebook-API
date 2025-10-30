import express from 'express'
import authRoute from './routes/auth.route.js'
import errorMiddleware from './middlewares/error.middleware.js'
import createHttpError from 'http-errors'
import notFoundMiddleware from './middlewares/not-found.middleware.js'
import shutdownUtil from './utils/shutdown.util.js'
import cors from 'cors'


const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use(express.json())

//routes
app.use('/api/auth', authRoute)
app.use('/api/post', (req, res) => { res.send('post service') })
app.use('/api/comment', (req, res) => { res.send('comment service') })
app.use('/api/like', (req, res) => { res.send('like service') })

//error handler
app.use(notFoundMiddleware)
app.use(errorMiddleware)

process.on("SIGINT", () => shutdownUtil("SIGINT")) //Ctrl + c
process.on('SIGTERM', () => shutdown('SIGTERM')); //normal kill process

export default app
