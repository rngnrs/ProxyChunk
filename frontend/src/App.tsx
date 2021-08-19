import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import AdminPage from './views/Admin'
import HomePage from './views/Home'
import './App.scss'


export default function App() {
	return (
		<>
			<Router>
				<Switch>
					<Route path="/admin">
						<AdminPage />
					</Route>
					<Route path="/">
						<HomePage />
					</Route>
				</Switch>
			</Router>
			<Toaster />
		</>
	)
}
