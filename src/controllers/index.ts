import { Response, Request } from "express"

import { IProxy } from "../types/proxy"
import { Proxy } from "../models/proxy"
import core from "../core"

export const getProxies = async (req: Request, res: Response): Promise<void> => {
	try {
		const proxies = await Proxy.find()
		res.status(200).json({ proxies })
	} catch (error) {
		throw error
	}
}

export const addProxies = async (req: Request, res: Response): Promise<void> => {
	try {
		core.checkMany(req.body.schemes, req.body.addresses, req.body.ports)

		res.status(200).json(req.body)
	} catch (error) {
		throw error
	}
}

