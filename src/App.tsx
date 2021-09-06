import React from 'react';
import logo from './assets/images/logo.svg';
import BookList from './components/BookList/BookList';
import '../src/assets/css/components/App.css';
import Clock from './components/Clock/Clock';

function App() {
	return (
		<div className="App">
			<header>
				<nav className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
				</nav>
			</header>

			<div className="container">
				<BookList></BookList>
			</div>

			<footer>
				<Clock></Clock>
				<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
			</footer>

		</div>
	);
}

export default App;