import dotenv from "dotenv"
import app from "./app.js"
import shutdown from './utils/shutdown.util.js'

dotenv.config()

const PORT = process.env.PORT || 8000

app.listen(PORT, (req, res) => {
    console.log(`server is runnig on http://localhost${PORT}`)
})