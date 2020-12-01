import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import BurgerBuilderReducer from './store/reducers/burgerBuilder';
import OrderReducer from './store/reducers/order';
import './index.css';

// combine reducers
const rootReducer = combineReducers({
	burgerBuilder: BurgerBuilderReducer,
	order: OrderReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// create store and pass in reducer and composeEnhancer
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk)),
);

ReactDOM.render(
	// <React.StrictMode>
	// Provider should wrap up everything. store={store} property connects with the application
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	// </React.StrictMode>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
