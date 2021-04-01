import { useState } from 'react'

import './SubmissionForm.css'
import { api } from '../../app/api'

export default function SubmissionForm() {
	const [inputIPRange, setInputIPRange] = useState(false)
	const [inputPortRange, setInputPortRange] = useState(false)
	const [formData, setFormData] = useState({
		schemes: ['http'] as string[],
		addresses: ['127.0.0.1', '127.0.0.1'] as string[],
		ports: [8080, 8080] as number[]
	})

	function toggleRangeInput(type: string) {
		if (type === 'address') {
			setInputIPRange(!inputIPRange) // Toggle
			setAddress(1, formData.addresses[0]) // Reset last address in range to the first one
		} else if (type === 'port') {
			setInputPortRange(!inputPortRange) // Toggle
			setPort(1, formData.ports[0]) // Reset last port in range to the first one
		}
	}

	function toggleScheme(scheme: string) {
		let newSchemes = formData.schemes

		if (newSchemes.includes(scheme)) {
			if (newSchemes.length === 1) return // It can't be an empty array
			newSchemes = newSchemes.filter(s => s !== scheme)
		} else {
			newSchemes.push(scheme)
		}

		setFormData({
			...formData,
			schemes: newSchemes
		})
	}

	function setAddress(index: number, value: string) {
		let newAddresses = formData.addresses

		newAddresses[index] = value

		if (!inputIPRange) {
			newAddresses[1] = newAddresses[0]
		}

		setFormData({
			...formData,
			addresses: newAddresses
		})
	}

	function setPort(index: number, value: string | number) {
		let newPorts = formData.ports

		newPorts[index] = 'string' === typeof value ? parseInt(value) : value

		if (!inputPortRange) {
			newPorts[1] = newPorts[0]
		}

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
				<input type="checkbox" id="http-checkbox" checked={formData.schemes.includes('http')} onChange={() => toggleScheme('http')}/>
				<label htmlFor="http-checkbox">HTTP</label>
				<br/>
				<input type="checkbox" id="https-checkbox" checked={formData.schemes.includes('https')} onChange={() => toggleScheme('https')}/>
				<label htmlFor="https-checkbox">HTTPS</label>
				<br/>
				<input type="checkbox" id="socks4-checkbox" checked={formData.schemes.includes('socks4')} onChange={() => toggleScheme('socks4')}/>
				<label htmlFor="socks4-checkbox">SOCKS4</label>
				<br/>
				<input type="checkbox" id="socks5-checkbox" checked={formData.schemes.includes('socks5')} onChange={() => toggleScheme('socks5')}/>
				<label htmlFor="socks5-checkbox">SOCKS5</label>
			</div>
			<div>
				<input type="checkbox" id="ip-range-checkbox" checked={inputIPRange} onChange={() => toggleRangeInput('address')}/>
				<label htmlFor="ip-range-checkbox">IP range</label>
				<br/>
				<input type="text" value={formData.addresses[0]} onChange={e => setAddress(0, e.target.value)}/>
				<span> — </span>
				<input type="text" disabled={!inputIPRange} value={formData.addresses[1]} onChange={e => setAddress(1, e.target.value)}/>
			</div>
			<div>
				<input type="checkbox" id="port-range-checkbox" checked={inputPortRange} onChange={() => toggleRangeInput('port')}/>
				<label htmlFor="port-range-checkbox">Port range</label>
				<br/>
				<input type="number" value={formData.ports[0]} onChange={e => setPort(0, e.target.value)}/>
				<span> — </span>
				<input type="number" disabled={!inputPortRange} value={formData.ports[1]} onChange={e => setPort(1, e.target.value)}/>
			</div>
			<button className="form-submit-button">Submit</button>
		</form>
	)
}
