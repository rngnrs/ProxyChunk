import { Response, Request } from "express"
import { IProxy } from "../types/proxy"
import { Proxy } from "../models/proxy"

export const getProxies = async (req: Request, res: Response): Promise<void> => {
	console.log('getProxies body:', req.body)
	try {
		const proxies = await (new Proxy()).find()
		res.status(200).json({ proxies })
	} catch (error) {
		throw error
	}
}

export const addProxy = async (req: Request, res: Response): Promise<void> => {
	console.log('addProxy body:', req.body)

	try {
		const body = req.body as Pick<IProxy, "address" | "port">

		const proxy = new Proxy(body.address, body.port)

		const newProxy = await proxy.save()
		const allProxies = await proxy.find()

		res
			.status(201)
			.json({ message: "Proxy added", proxy: newProxy, proxies: allProxies })
	} catch (error) {
		throw error
	}
}

