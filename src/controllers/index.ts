import { Response, Request } from "express"

import { Proxy } from "../models/proxy"
import core from "../core"

const proxiesPerPage = 10

export const getProxies = async (req: Request, res: Response): Promise<void> => {
	try {
		const page = parseInt(req.query.page as string) || 0
		const totalPages = Math.ceil(await Proxy.count() / proxiesPerPage)

		if (page < totalPages) {
			const proxies = await Proxy.find(proxiesPerPage, page)
			res.status(200).json({ proxies, page, totalPages })
		} else {
			res.status(404).json({ page, totalPages })
		}

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

