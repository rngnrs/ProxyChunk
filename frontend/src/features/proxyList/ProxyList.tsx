import { Link } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './ProxyList.scss'
import { api } from '../../app/api'
import { reinsertProxies, selectProxies } from './proxyListSlice'
import Line from './Line'
import Pagination from './Pagination'

export default function ProxyList({ goodOnly }: { goodOnly: boolean }) {
	const proxies = useSelector(selectProxies)
	const dispatch = useDispatch()
	const [currentPage, setCurrentPage] = useState(0)
	const [totalPages, setTotalPages] = useState(0)

	const switchToPage = useCallback((i: number) => {
		api.getProxies(i, goodOnly)
			.then((data) => {
				setCurrentPage(data.page)
				setTotalPages(data.totalPages)
				dispatch(reinsertProxies(data.proxies))
			})
	}, [dispatch])

	useEffect(() => {
		switchToPage(0)
	}, [switchToPage])

	if (Object.entries(proxies).length === 0) {
		return (
			<div className={'proxy-list'}>
				Ain't nobody here but us chickens! Proxies can be added to the pool at the <Link to="/admin">control panel</Link>.
			</div>
		)
	}

	return (
		<div className={`proxy-list${window.innerHeight > window.innerWidth ? ' mobile' : ''}`}>
			{ window.innerHeight > window.innerWidth
			? 	<div className="proxy-list-line header">
					<div>Address</div>
					<div>Speed</div>
					<div>Last check</div>
				</div>
			:	<div className="proxy-list-line header">
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
			<Pagination totalPages={ totalPages } currentPage={ currentPage } switchToPage={ switchToPage } />
		</div>
	)
}
