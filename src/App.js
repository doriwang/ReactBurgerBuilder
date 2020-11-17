import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import Aux from './hoc/Aux';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckoutPage from './containers/CheckoutPage/CheckoutPage';
import OrdersPage from './containers/OrdersPage/OrdersPage';

class App extends PureComponent {
	render() {
		return (
			<Aux>
				<Layout>
					<Switch>
						<Route path='/' exact component={BurgerBuilder} />
						<Route path='/checkout' component={CheckoutPage} />
						<Route path='/orders' component={OrdersPage} />
					</Switch>
				</Layout>
			</Aux>
		);
	}
}

export default App;
