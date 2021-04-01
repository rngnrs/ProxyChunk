import './App.css'
import ProxyList from './features/proxyList/ProxyList'
import SubmissionForm from './features/submissionForm/SubmissionForm'

export default function App() {
	return (
		<div className="App">
			<ProxyList />
			<SubmissionForm />
		</div>
	)
}
