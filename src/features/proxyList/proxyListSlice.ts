import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { IProxy } from '../../types'

interface ProxyListState {
	proxies: IProxy[]
}

const initialState: ProxyListState = {
	proxies: []
}

export const proxyListSlice = createSlice({
	name: 'proxyList',
	initialState,
	reducers: {
		insertProxies: (state, action: PayloadAction<IProxy[]>) => {
			state.proxies = [...state.proxies, ...action.payload]
		}
	}
})

export const { insertProxies } = proxyListSlice.actions

export const selectProxies = (state: RootState) => state.proxyList.proxies

export default proxyListSlice.reducer
