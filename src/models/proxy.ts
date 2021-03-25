// create table proxies (
// 	address inet,
// 	port smallint,
// 	added_at timestamp,
// 	checked_at timestamp,
// 	primary key(address, port)
// )

import { IProxy } from "./../types/proxy"
import pool from "./index"

const queries = {
	selectProxies: () => {
		return "select address, port, added_at as \"addedAt\", checked_at as \"checkedAt\" from proxies"
	},

	insertProxy: (address: string, port: number) => {
		return `insert into proxies (address, port, added_at) values ('${address}', ${port}, to_timestamp(${Date.now()} / 1000.0))`
	}
}

export class Proxy implements IProxy {
	address?: string
	port?: number
	addedAt?: Date
	checkedAt?: Date

	constructor(data: {address?: string, port?: number, addedAt?: string, checkedAt?: string}) {
		this.address = data.address
		this.port = data.port

		if (data.addedAt) {
			this.addedAt = new Date(data.addedAt)
		}

		if (data.checkedAt) {
			this.addedAt = new Date(data.checkedAt)
		}
	}

	static find() {
		return new Promise<IProxy[]>((resolve, reject) => {
			pool.query(queries.selectProxies(), (error, results) => {
				error ? reject(error) : resolve(results.rows.map(row => new Proxy(row)))
			})
		})
	}

	save() {
		return new Promise<IProxy>((resolve, reject) => {
			if (this.address === undefined || this.port === undefined) {
				reject()
			} else {
				pool.query(queries.insertProxy(this.address, this.port), (error, results) => {
					error ? reject(error) : resolve((this as unknown) as IProxy)
				})
			}
			
		})
	}
}
