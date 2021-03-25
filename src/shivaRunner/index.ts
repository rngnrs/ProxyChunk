import { spawn } from "child_process"

import { IProxy } from "../types/proxy"
import { Proxy } from "../models/proxy"

const shiva = spawn("ProxyShiva", ["-json", "-interactive"])

shiva.stdin.setDefaultEncoding("utf-8")

shiva.stdout.on("data", (data) => {
	let proxy = new Proxy(JSON.parse(data.toString()))
	proxy.update()
})

export default {
	check(proxy: IProxy) {
		shiva.stdin.write(`${proxy.scheme}://${proxy.address}:${proxy.port}\n`)
	}
}
