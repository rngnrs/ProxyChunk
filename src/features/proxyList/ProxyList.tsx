import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { api } from '../../app/api'
import { insertProxies, selectProxies } from './proxyListSlice'
import Line from './Line'

export default function ProxyList() {
	const proxies = useSelector(selectProxies)
	const dispatch = useDispatch()

	useEffect(() => {
		api.getProxies()
			.then(proxies => dispatch(insertProxies(proxies)))
	}, [dispatch])

	return (
		<div className="proxy-list">
			{
				Object.values(proxies).map(p => <Line proxy={p} />)
			}
		</div>
	)
}
