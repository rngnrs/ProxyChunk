import { spawn } from "child_process"

import { IProxy } from "../types/proxy"
import { Proxy } from "../models/proxy"

const shiva = spawn("ProxyShiva", ["-json", "-interactive", "-skipres"])

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

function recheckRoutine() {
	Proxy.findLRC().then((leastRecentlyChecked) => {
		checker.checkOne(leastRecentlyChecked.scheme, leastRecentlyChecked.address, leastRecentlyChecked.port)
	})
	.catch((e) => {
		//
	})
}

let recheckInterval = setInterval(recheckRoutine, 1e4)

const checker = {
	checkOne(scheme: string, address: string, port: number) {
		shiva.stdin.write(`${scheme}://${address}:${port}\n`)
	},

	checkMany(schemes: string[], addresses: string[], ports: number[]) {
		shiva.stdin.write(`${schemes.join(",")}://${addresses.join("-")}:${ports.join("-")}\n`)
	}
}

export default checker
