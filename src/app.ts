import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

import routes from "./routes"
import checker from "./core"

const app = express()
const port: string | number = process.env.PORT || 4000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(routes)

checker.startRecheckRoutine()

app.listen(port, () => {
	console.log(`App running on port ${port}.`)
})
