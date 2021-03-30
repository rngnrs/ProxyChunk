import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './ProxyList.css'
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
			<div className="proxy-list-line">
				<div>Scheme</div>
				<div>IP Address</div>
				<div>Port</div>
				<div>Speed</div>
				<div>Last update</div>
			</div>
			{
				Object.entries(proxies).map(([k, p]) => <Line key={k} proxy={p} />)
			}
		</div>
	)
}
