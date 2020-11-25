import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSum from '../../components/Order/CheckoutSum/CheckoutSum';
import ContactInfo from '../CheckoutPage/ContactInfo/ContactInfo';

class CheckoutPage extends Component {
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
					ingredients={this.props.igs}
					cancelCheckout={this.cancelCheckoutHandler}
					continueCheckout={this.continueCheckoutHandler}
				/>
				<Route
					path={this.props.match.path + '/contact-info'}
					component={ContactInfo}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		igs: state.ingredients,
	};
};

export default connect(mapStateToProps)(CheckoutPage);

// componentDidMount() {
// 	const query = new URLSearchParams(this.props.location.search);
// 	const ingredients = {};
// 	let price = null;
// 	for (let param of query.entries()) {
// 		// ['salad', '1']
// 		if (param[0] === 'price') {
// 			price = param[1];
// 		} else {
// 			ingredients[param[0]] = +param[1];
// 		}
// 	}
// 	this.setState({ ingredients: ingredients, totalPrice: price });
// }

// <Route
// 	path={this.props.match.path + '/contact-info'}
//  with render manually it can pass down props
//  render={(props) => (
//  	<ContactInfo
//  		ingredients={this.props.igs}
//  		totalPrice={this.state.totalPrice}
//  		{...props} // because render it doesn't get the history but ... spread will get all the props and pass them down. or wrap the whole CheckoutPage with withRouter()
//  	/>
//  )}
// />;
