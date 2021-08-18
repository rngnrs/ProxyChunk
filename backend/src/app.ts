import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

import routes from "./routes"
import checker from "./core"
import { testDatabaseConnection, createTable } from "./models"

testDatabaseConnection()
	.catch((error) => {
		switch (error.code) {
			case "ECONNREFUSED":
				console.error(`Couldn't connect to PostgreSQL. Is it running and available under ${error.address}:${error.port}?`)
				break

			case "28000":
				console.error(`Couldn't access PostgreSQL. Are the username and password correct?`)
				break

			case "3D000":
				console.error(`Couldn't access the PostgreSQL database "${process.env.POSTGRES_DB}". Does it exist?`)
				break

			case "42P01":
				console.error(`Table "proxies" not found, attempting to fix...`)
				createTable("proxies")
					.then(() => {
						console.log(`Table "proxies" successfully created.`)
					})
				return

			default:
				console.error(JSON.stringify(error))

		}

		process.exit(1)
	})

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
