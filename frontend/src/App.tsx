import './App.scss'
import ProxyList from './features/proxyList/ProxyList'
import SubmissionForm from './features/submissionForm/SubmissionForm'
import { Toaster } from 'react-hot-toast'

export default function App() {
	return (
		<div className={`App${window.innerHeight > window.innerWidth ? ' mobile' : ''}`}>
			<ProxyList />
			<SubmissionForm />
			<Toaster />
		</div>
	)
}
