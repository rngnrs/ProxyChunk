import { IProxy } from '../../types'

export default function ProxyList({ proxy }: { proxy: IProxy }) {
	return (
		<div className="proxy-list-line">
			{ `${ proxy.scheme }://${ proxy.address }:${ proxy.port }` }
		</div>
	)
}
