import dotenv from "dotenv"
import app from "./app.js"

dotenv.config()

const PORT = process.env.PORT || 8000

console.log('PORT', PORT)

app.listen(PORT, (req, res) => {
    console.log(`server is runnig on http://localhost${PORT}`)
})