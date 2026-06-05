import express from "express"
import mainRoute from "./routes/mainRoute"
import cors from "cors"

const app = express()
const port = 3000

app.use(cors())
app.use(express.static("public"))
app.use(express.json())

app.use(mainRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})