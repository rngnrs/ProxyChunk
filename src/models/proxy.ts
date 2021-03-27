// create table proxies (
// 	scheme text,
// 	address inet,
// 	port smallint,
// 	good boolean,
// 	speed real,
// 	created_at timestamp,
// 	updated_at timestamp,
// 	primary key(scheme, address, port)
// )

import { IProxy } from "./../types/proxy"
import pool from "./index"

const queries = {
	_ts: () => {
		return `to_timestamp(${Date.now()} / 1000.0)`
	},

	selectProxy: (scheme: string, address: string, port: number) => {
		return `select scheme, address, port, good, speed, created_at as \"createdAt\", updated_at as \"updatedAt\" from proxies where scheme = '${scheme}' and address = '${address}' and port = ${port}`
	},

	selectProxies: () => {
		return "select scheme, address, port, good, speed, created_at as \"createdAt\", updated_at as \"updatedAt\" from proxies"
	},

	selectLRC: () => {
		return "select scheme, address, port, good, speed, created_at as \"createdAt\", updated_at as \"updatedAt\" from proxies where updated_at = (select MIN(updated_at) from proxies) limit 1"
	},

	insertProxy: (scheme: string, address: string, port: number, good = false, speed = -1) => {
		return `insert into proxies (scheme, address, port, good, speed, created_at, updated_at) values ('${scheme}', '${address}', ${port}, ${good}, ${speed}, ${queries._ts()}, ${queries._ts()})`
	},

	updateProxy: (scheme: string, address: string, port: number, good = false, speed = -1) => {
		return `update proxies set good = ${good}, speed = ${speed}, updated_at = ${queries._ts()} where scheme = '${scheme}' and address = '${address}' and port = ${port}`
	}
}

export class Proxy implements IProxy {
	scheme: string
	address: string
	port: number
	good?: boolean
	speed?: number
	createdAt?: Date
	updatedAt?: Date

	constructor(data: {scheme: string, address: string, port: number, good?: boolean, speed?: number, createdAt?: string, updatedAt?: string}) {
		this.scheme = data.scheme
		this.address = data.address
		this.port = data.port

		if (data.good !== undefined) {
			this.good = data.good
		}

		if (data.speed !== undefined) {
			this.speed = data.speed
		}

		if (data.createdAt !== undefined) {
			this.createdAt = new Date(data.createdAt)
		}

		if (data.updatedAt !== undefined) {
			this.updatedAt = new Date(data.updatedAt)
		}
	}

	static find() {
		return new Promise<IProxy[]>((resolve, reject) => {
			pool.query(queries.selectProxies(), (error, results) => {
				error ? reject(error) : resolve(results.rows.map(row => new Proxy(row)))
			})
		})
	}

	static findLRC() {
		return new Promise<IProxy>((resolve, reject) => {
			pool.query(queries.selectLRC(), (error, results) => {
				error || results.rows.length < 1 ? reject(error) : resolve(new Proxy(results.rows[0]))
			})
		})
	}

	// insert() {
	// 	return new Promise<IProxy>((resolve, reject) => {
	// 		pool.query(queries.insertProxy(this.scheme, this.address, this.port), (error, results) => {
	// 			if (error === undefined) {
	// 				shivaRunner.checkOne(this.scheme, this.address, this.port)
	// 				resolve((this as unknown) as IProxy)
	// 			} else {
	// 				reject(error)
	// 			}
	// 		})
	// 	})
	// }

	// update() {
	// 	return new Promise<IProxy>((resolve, reject) => {
	// 		pool.query(queries.updateProxy(this.scheme, this.address, this.port, this.good as boolean, this.speed as number), (error, results) => {
	// 			if (error === undefined) {
	// 				resolve((this as unknown) as IProxy)
	// 			} else {
	// 				reject(error)
	// 			}
	// 		})
	// 	})
	// }

	upsert() {
		return new Promise<IProxy>((resolve, reject) => {
			pool.query(queries.selectProxy(this.scheme, this.address, this.port), (error, results) => {
				if (error === undefined && results.rows.length === 1) {
					pool.query(queries.updateProxy(this.scheme, this.address, this.port, this.good as boolean, this.speed as number), (error, results) => {
						error ? reject(error) : resolve((this as unknown) as IProxy)
					})
				} else {
					pool.query(queries.insertProxy(this.scheme, this.address, this.port, this.good as boolean, this.speed as number), (error, results) => {
						error ? reject(error) : resolve((this as unknown) as IProxy)
					})
				}
			})
		})
	}
}
