import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSum from '../../components/Order/CheckoutSum/CheckoutSum';
import ContactInfo from '../CheckoutPage/ContactInfo/ContactInfo';

class CheckoutPage extends Component {
	state = {
		ingredients: {},
		totalPrice: null,
	};

	componentDidMount() {
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		let price = null;
		for (let param of query.entries()) {
			// ['salad', '1']
			if (param[0] === 'price') {
				price = param[1];
			} else {
				ingredients[param[0]] = +param[1];
			}
		}
		this.setState({ ingredients: ingredients, totalPrice: price });
	}

	cancelCheckoutHandler = () => {
		this.props.history.goBack();
	};
	continueCheckoutHandler = () => {
		this.props.history.replace('/checkout/contact-info');
	};

	render() {
		return (
			<div>
				<CheckoutSum
					ingredients={this.state.ingredients}
					cancelCheckout={this.cancelCheckoutHandler}
					continueCheckout={this.continueCheckoutHandler}
				/>
				<Route
					path={this.props.match.path + '/contact-info'}
					// with render manually it can pass down props
					render={(props) => (
						<ContactInfo
							ingredients={this.state.ingredients}
							totalPrice={this.state.totalPrice}
							{...props} // because render it doesn't get the history but ... will get all the props and pass them down. or wrap the whole CheckoutPage with withRouter()
						/>
					)}
				/>
			</div>
		);
	}
}

export default CheckoutPage;
