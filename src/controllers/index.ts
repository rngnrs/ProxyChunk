import { Response, Request } from "express"

import { Proxy } from "../models/proxy"
import { ip2Number, number2ip } from "../utils"

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
		req.body.schemes.forEach((scheme: string) => {
			for (let port = req.body.ports[0]; port <= req.body.ports[1]; ++port) {
				for (let address = ip2Number(req.body.addresses[0]); address <= ip2Number(req.body.addresses[1]); ++address) {
					let proxy = new Proxy({scheme, address: number2ip(address), port})

					proxy.insert()
						.catch((error) => {
							// Throws an error if the proxy is already in the db
							// No need to do anything
						})
				}
			}
		})

		res.status(200).json(req.body)
	} catch (error) {
		throw error
	}
}

