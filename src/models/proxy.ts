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
import shivaRunner from "../shivaRunner"

const queries = {
	selectProxies: () => {
		return "select scheme, address, port, good, speed, created_at as \"createdAt\", updated_at as \"updatedAt\" from proxies"
	},

	insertProxy: (scheme: string, address: string, port: number) => {
		return `insert into proxies (scheme, address, port, created_at) values ('${scheme}', '${address}', ${port}, to_timestamp(${Date.now()} / 1000.0))`
	},

	updateProxy: (scheme: string, address: string, port: number, good = false, speed = -1) => {
		return `update proxies set good = ${good}, speed = ${speed}, updated_at = to_timestamp(${Date.now()} / 1000.0) where scheme = '${scheme}' and address = '${address}' and port = ${port}`
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

	insert() {
		return new Promise<IProxy>((resolve, reject) => {
			pool.query(queries.insertProxy(this.scheme, this.address, this.port), (error, results) => {
				if (error === undefined) {
					shivaRunner.check(this)
					resolve((this as unknown) as IProxy)
				} else {
					reject(error)
				}
			})
		})
	}

	update() {
		return new Promise<IProxy>((resolve, reject) => {
			pool.query(queries.updateProxy(this.scheme, this.address, this.port, this.good as boolean, this.speed as number), (error, results) => {
				if (error === undefined) {
					resolve((this as unknown) as IProxy)
				} else {
					reject(error)
				}
			})
		})
	}
}
