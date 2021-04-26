import axios from 'axios'

import { IProxy } from '../types'

const baseURI: string = 'http://192.168.0.18:4000/api'

export const api = {
	getProxies: async (page: number = 0): Promise<{page: number, totalPages: number, proxies: IProxy[]}> => {
		try {
			return axios.get(baseURI + `/proxies?page=${page}`).then(response => response.data)
		} catch (error) {
			throw new Error(error)
		}
	},

	postProxies: async ({schemes, addresses, ports}: {schemes: Set<string>, addresses: [string, string], ports: [number, number]}): Promise<void> => {
		try {
			await axios.post(baseURI + '/proxies', {schemes: Array.from(schemes), addresses, ports})
		} catch (error) {
			throw new Error(error)
		}
	}
}
