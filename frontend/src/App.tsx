import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import AdminPage from './views/Admin'
import HomePage from './views/Home'
import './App.scss'

export default function App() {
	return <>
		<Router>
			<header>
				<Link to="/">ProxyChunk</Link>
			</header>
			<Switch>
				<Route path="/admin">
					<AdminPage />
				</Route>
				<Route path="/">
					<HomePage />
				</Route>
			</Switch>
			<footer>
				<Link to="/admin">Control panel</Link>
			</footer>
		</Router>
		<Toaster />
	</>
}
