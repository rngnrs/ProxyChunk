// create table proxies(id serial primary key, address inet, port smallint, addedAt timestamp, checkedAt timestamp);

import { IProxy } from "./../types/proxy"

export class Proxy implements IProxy {
	address: string
	port: number
	addedAt?: number
	checkedAt?: number

	constructor(address?: string, port?: number) {
		this.address = address
		this.port = port
	}

	async find() {
		return [this]
	}

	async save() {
		return this
	}
}
