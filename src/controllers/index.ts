import { Response, Request } from "express"
import { IProxy } from "../types/proxy"
import { Proxy } from "../models/proxy"

export const getProxies = async (req: Request, res: Response): Promise<void> => {
	try {
		const proxies = await Proxy.find()
		res.status(200).json({ proxies })
	} catch (error) {
		throw error
	}
}

export const addProxy = async (req: Request, res: Response): Promise<void> => {
	try {
		const body = req.body as Pick<IProxy, "address" | "port">

		const proxy = new Proxy({address: body.address, port: body.port})

		proxy.save()
			.then((newProxy) => {
				res
					.status(201)
					.json(newProxy)
			})
			.catch((error) => {
				res
					.status(500)
					.json({error: error.detail})
			})
	} catch (error) {
		throw error
	}
}

