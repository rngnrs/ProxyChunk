import axios from 'axios'

import { IProxy } from '../types'

const baseURI: string = 'http://192.168.0.18:4000/api'

export const api = {
	getProxies: async (): Promise<IProxy[]> => {
		try {
			return axios.get(baseURI + '/proxies').then(response => response.data.proxies)
		} catch (error) {
			throw new Error(error)
		}
	},

	postProxies: async (data: {}): Promise<void> => {
		try {
			await axios.post(baseURI + '/proxies', data)
		} catch (error) {
			throw new Error(error)
		}
	}
}
