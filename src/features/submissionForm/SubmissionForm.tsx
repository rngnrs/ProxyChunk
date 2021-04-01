import { useState } from 'react'

import './SubmissionForm.css'
import { api } from '../../app/api'

export default function SubmissionForm() {
	const [inputIPRange, setInputIPRange] = useState(true)
	const [inputPortRange, setInputPortRange] = useState(true)
	const [formData, setFormData] = useState({
		schemes: [] as string[],
		addresses: ['127.0.0.1', '127.0.0.1'] as string[],
		ports: [8080, 8080] as number[]
	})

	function toggleScheme(scheme: string) {
		let newSchemes = formData.schemes

		newSchemes.includes(scheme)
			? newSchemes = newSchemes.filter(s => s !== scheme)
			: newSchemes.push(scheme)

		setFormData({
			...formData,
			schemes: newSchemes
		})
	}

	function setAddress(index: number, value: string) {
		let newAddresses = formData.addresses

		newAddresses[index] = value

		setFormData({
			...formData,
			addresses: newAddresses
		})
	}

	function setPort(index: number, value: string) {
		let newPorts = formData.ports

		newPorts[index] = parseInt(value)

		setFormData({
			...formData,
			ports: newPorts
		})
	}

	function submit() {
		api.postProxies(formData)
	}

	return (
		<form className="submission-form" onSubmit={e => {e.preventDefault(); submit()}}>
			<div className="submission-form-title">Add proxies</div>
			<div className="scheme-form">
				<input type="checkbox" name="" id="http-checkbox" checked={formData.schemes.includes('http')} onChange={() => toggleScheme('http')}/>
				<label htmlFor="http-checkbox">HTTP</label>
				<br/>
				<input type="checkbox" name="" id="https-checkbox" checked={formData.schemes.includes('https')} onChange={() => toggleScheme('https')}/>
				<label htmlFor="https-checkbox">HTTPS</label>
				<br/>
				<input type="checkbox" name="" id="socks4-checkbox" checked={formData.schemes.includes('socks4')} onChange={() => toggleScheme('socks4')}/>
				<label htmlFor="socks4-checkbox">SOCKS4</label>
				<br/>
				<input type="checkbox" name="" id="socks5-checkbox" checked={formData.schemes.includes('socks5')} onChange={() => toggleScheme('socks5')}/>
				<label htmlFor="socks5-checkbox">SOCKS5</label>
			</div>
			<div>
				<input type="checkbox" name="" id="ip-range-checkbox" checked={!inputIPRange} onChange={() => setInputIPRange(!inputIPRange)}/>
				<label htmlFor="ip-range-checkbox">IP range</label>
				<br/>
				<input type="text" placeholder="IP" value={formData.addresses[0]} onChange={e => setAddress(0, e.target.value)}/>
				<span> — </span>
				<input type="text" placeholder="Last IP in range" disabled={inputIPRange} value={formData.addresses[1]} onChange={e => setAddress(1, e.target.value)}/>
			</div>
			<div>
				<input type="checkbox" name="" id="port-range-checkbox" checked={!inputPortRange} onChange={() => setInputPortRange(!inputPortRange)}/>
				<label htmlFor="port-range-checkbox">Port range</label>
				<br/>
				<input type="number" placeholder="Port" value={formData.ports[0]} onChange={e => setPort(0, e.target.value)}/>
				<span> — </span>
				<input type="number" placeholder="Last port in range" disabled={inputPortRange} value={formData.ports[1]} onChange={e => setPort(1, e.target.value)}/>
			</div>
			<button className="form-submit-button">Submit</button>
		</form>
	)
}
