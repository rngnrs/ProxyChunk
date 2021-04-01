import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './ProxyList.scss'
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
		<div className={`proxy-list${window.innerHeight > window.innerWidth ? ' mobile' : ''}`}>
			{ window.innerHeight > window.innerWidth
			? 	<div className="proxy-list-line">
					<div>Address</div>
					<div>Speed</div>
					<div>Last check</div>
				</div>
			:	<div className="proxy-list-line">
					<div>Scheme</div>
					<div>Address</div>
					<div>Port</div>
					<div>Speed</div>
					<div>Last check</div>
				</div>
			}
			{
				Object.entries(proxies).map(([k, p]) => <Line key={k} proxy={p} />)
			}
		</div>
	)
}
