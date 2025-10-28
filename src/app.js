import express from 'express'

const app = express()

app.use(express.json())

app.use("/api/auth", (req, res) => { res.send("auth service") })

export default app