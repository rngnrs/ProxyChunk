import { Response, Request } from "express"

import { Proxy } from "../models/proxy"
import core from "../core"

const proxiesPerPage = parseInt(process.env.PROXIES_PER_PAGE as string) || 10

export const getProxies = async (req: Request, res: Response): Promise<void> => {
	try {
		const page = parseInt(req.query.page as string) || 0
		const totalPages = await Proxy.count()
			.then(n => Math.ceil(n / proxiesPerPage))

		if (page < totalPages) {
			Proxy.all(proxiesPerPage, page)
				.then((proxies) => {
					res.status(200).json({ proxies, page, totalPages })
				})
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

