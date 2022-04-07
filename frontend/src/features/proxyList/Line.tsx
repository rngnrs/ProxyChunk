import { IProxy } from '../../types'
import { num2Word } from '../../utils'

function timeDiff(date: Date) {
	return +new Date() - +new Date(date)
}

function timeDiffToText(ms: number) {
	if (ms < 4e4){
		return 'Just now'
	}

	let minutes = Math.round(ms / 6e4)
	if (minutes < 50){
		return `${minutes} ${num2Word(minutes, ['minute', 'minutes'])} ago`
	}

	let hours = Math.round(ms / 3.6e6)
	if (hours < 20){
		return `${hours} ${num2Word(hours, ['hour', 'hours'])} ago`
	}

	let days = Math.round(ms / 8.64e7)
	if (1 === days){
		return "yesterday"
	}

	return `${days} ${num2Word(days, ['day', 'days'])} ago`
}

function SpeedDiv({ speed }: { speed: number }) {
	let formattedSpeed: string

	if (speed < 0) {
		formattedSpeed = "Bad"
	} else {
		formattedSpeed = speed.toFixed(2) + "ms"
	}

	return <div>{ formattedSpeed }</div>
}

export default function ProxyList({ proxy }: { proxy: IProxy }) {
	if (window.innerHeight > window.innerWidth) {
		return (
			<div className="proxy-list-line">
				<div>{ proxy.scheme }://{ proxy.address }:{ proxy.port }</div>
				<SpeedDiv speed={ proxy.speed } />
				<div>{ timeDiffToText(timeDiff(proxy.updatedAt)) }</div>
			</div>
		)
	} else {
		return (
			<div className="proxy-list-line">
				<div>{ proxy.scheme }</div>
				<div>{ proxy.address }</div>
				<div>{ proxy.port }</div>
				<SpeedDiv speed={ proxy.speed } />
				<div>{ timeDiffToText(timeDiff(proxy.updatedAt)) }</div>
			</div>
		)
	}
}
