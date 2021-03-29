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
			{ proxies.length > 0 &&
				proxies.map(proxy => <Line proxy={ proxy } />)
			}
		</div>
	)
}
