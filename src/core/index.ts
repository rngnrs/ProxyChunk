import { spawn } from "child_process"

import { Proxy } from "../models/proxy"

const shivaParams = ["-json", "-interactive"]

if (process.env.SKIP_RESERVED === undefined || process.env.SKIP_RESERVED === "true") {
	shivaParams.push("-skipres")
}

if (process.env.ANY_CERT === "true") {
	shivaParams.push("-skipcert")
}

if (process.env.TIMEOUT !== undefined) {
	shivaParams.push(`-timeout=${process.env.TIMEOUT}`)
}

const shiva = spawn("ProxyShiva", shivaParams)

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

let recheckInterval = setInterval(recheckRoutine, 1e6)

const checker = {
	checkOne(scheme: string, address: string, port: number) {
		shiva.stdin.write(`${scheme}://${address}:${port}\n`)
	},

	checkMany(schemes: string[], addresses: string[], ports: number[]) {
		shiva.stdin.write(`${schemes.join(",")}://${addresses.join("-")}:${ports.join("-")}\n`)
	}
}

export default checker
