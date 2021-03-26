import { spawn } from "child_process"

import { IProxy } from "../types/proxy"
import { Proxy } from "../models/proxy"

const shiva = spawn("ProxyShiva", ["-json", "-interactive"])

shiva.stdin.setDefaultEncoding("utf-8")

shiva.stdout.on("data", (data) => {
	data.toString().split("\n").forEach((result: string) => {
		try {
			let proxy = new Proxy(JSON.parse(result))
			proxy.upsert()
		} catch(e) {
			//
		}
	})
})

export default {
	checkOne(scheme: string, address: string, port: number) {
		shiva.stdin.write(`${scheme}://${address}:${port}\n`)
	},

	checkMany(schemes: string[], addresses: string[], ports: number[]) {
		shiva.stdin.write(`${schemes.join(",")}://${addresses.join("-")}:${ports.join("-")}\n`)
	}
}
