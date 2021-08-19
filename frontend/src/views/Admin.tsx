import ProxyList from '../features/proxyList/ProxyList'
import SubmissionForm from '../features/submissionForm/SubmissionForm'

export default function App() {
	return (
		<div className={`App${window.innerHeight > window.innerWidth ? ' mobile' : ''}`}>
			<ProxyList />
			<SubmissionForm />
		</div>
	)
}
