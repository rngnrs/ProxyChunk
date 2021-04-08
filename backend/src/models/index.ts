import { Pool, QueryResult } from "pg"

require("dotenv").config()

const pool = new Pool({
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	host: process.env.POSTGRES_HOST,
	port: process.env.POSTGRES_PORT === undefined ? 5432 : parseInt(process.env.POSTGRES_PORT),
	database: process.env.POSTGRES_DB
})

export function executeQuery(query: string): Promise<QueryResult<any>> {
	return new Promise((resolve, reject) => {
		pool.query(query, (err: Error, results: QueryResult<any>) => {
			err === undefined ? resolve(results) : reject(err)
		})
	})
}

export async function testDatabaseConnection(): Promise<QueryResult<any>> {
	return executeQuery("select * from proxies limit 1")
}

export async function createTable(tableName: string) {
	switch (tableName) {
		case "proxies":
			return executeQuery(`create table proxies (scheme text, address inet, port smallint, good boolean, speed real, created_at timestamp, updated_at timestamp, primary key(scheme, address, port))`)

		default:
			throw `Table name ${tableName} is not recognised.`
	}
}
