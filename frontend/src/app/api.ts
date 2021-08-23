import axios from 'axios'

import { IProxy } from '../types'

export const api = {
	getProxies: async (page: number = 0): Promise<{page: number, totalPages: number, proxies: IProxy[]}> => {
		try {
			return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/proxies?page=${page}`).then(response => response.data)
		} catch (error) {
			throw new Error(error)
		}
	},

	postProxies: async ({schemes, addresses, ports}: {schemes: Set<string>, addresses: [string, string], ports: [number, number]}): Promise<void> => {
		try {
			await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/proxies`,
				{ schemes: Array.from(schemes), addresses, ports },
				{ withCredentials: true }
			)
		} catch (error) {
			throw new Error(error)
		}
	},

	login: async ({accessCode}: {accessCode?: string} = {}): Promise<{user: string}> => {
		return axios.post(
			`${process.env.REACT_APP_API_ENDPOINT}/login`,
			{ accessCode },
			{ withCredentials: true }
		)
	},
}
