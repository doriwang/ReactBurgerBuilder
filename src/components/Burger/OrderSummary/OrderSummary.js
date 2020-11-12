import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
	componentDidUpdate() {
		console.log('orderSummary updates');
	}
	render() {
		const ingredientsSummary = Object.keys(this.props.ingredients).map(
			(igKey) => {
				return (
					<li key={igKey}>
						<span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
						{this.props.ingredients[igKey]}
					</li>
				);
			},
		);
		return (
			<Aux>
				<h3>Order Summary</h3>
				<p>A delicious burger with following ingredients:</p>
				<ul>{ingredientsSummary}</ul>
				<h3>
					<strong>{`Order Total: $${this.props.totalPrice}`}</strong>
				</h3>
				<Button btnType='danger' clicked={this.props.cancelCheckout}>
					CANCEL
				</Button>
				<Button btnType='success' clicked={this.props.continueCheckout}>
					CONTINUE
				</Button>
			</Aux>
		);
	}
}

export default OrderSummary;
