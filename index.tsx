import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './src/App';
import './src/assets/css/index.css';
import { store } from './src/store/store';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App></App>
		</Provider>

	</React.StrictMode>,
	document.getElementById('root')
);