import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Aux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const ingredientPricesList = {
	salad: 1,
	cheese: 1,
	meat: 2,
	bacon: 1.5,
};

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
		totalPrice: 3,
		purchasable: false,
		checkout: false,
	};

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		this.setState({ purchasable: sum > 0 });
	}

	checkoutHandler = () => {
		this.setState({ checkout: true });
	};

	resetCheckoutState = () => {
		this.setState({ checkout: false });
	};

	continueCheckoutState = () => {
		alert('continue checkout');
	};

	addIngredients = (type) => {
		// ingredients
		const startIgQty = this.state.ingredients[type];
		const updatedIgQty = startIgQty + 1;
		const updatedIg = { ...this.state.ingredients }; // create a copy of ingredient obj
		updatedIg[type] = updatedIgQty;
		// price
		const igPriceAddition = ingredientPricesList[type];
		const totalPrice = this.state.totalPrice;
		const finalPrice = totalPrice + igPriceAddition;
		this.setState({ ingredients: updatedIg, totalPrice: finalPrice });
		this.updatePurchaseState(updatedIg);
	};

	removeIngredients = (type) => {
		// ingredients
		const startIgQty = this.state.ingredients[type];
		if (startIgQty <= 0) {
			return;
		}
		const updatedIgQty = startIgQty - 1;
		const updatedIg = { ...this.state.ingredients }; // create a copy of ingredient obj
		updatedIg[type] = updatedIgQty;
		// price
		const igPriceDeduction = ingredientPricesList[type];
		const totalPrice = this.state.totalPrice;
		const finalPrice = totalPrice - igPriceDeduction;
		this.setState({ ingredients: updatedIg, totalPrice: finalPrice });
		this.updatePurchaseState(updatedIg);
	};

	render() {
		const disableRemoveIg = {
			...this.state.ingredients,
		};
		for (let value in disableRemoveIg) {
			disableRemoveIg[value] = disableRemoveIg[value] <= 0;
		}
		return (
			<Aux>
				<Modal show={this.state.checkout} closeModal={this.resetCheckoutState}>
					<OrderSummary
						ingredients={this.state.ingredients}
						continueCheckout={this.continueCheckoutState}
						cancelCheckout={this.resetCheckoutState}
						totalPrice={this.state.totalPrice.toFixed(2)}
					/>
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					addIngredients={this.addIngredients}
					removeIngredients={this.removeIngredients}
					disableRemoveIg={disableRemoveIg}
					totalPrice={this.state.totalPrice.toFixed(2)}
					purchasable={this.state.purchasable}
					checkout={this.checkoutHandler}
				/>
			</Aux>
		);
	}
}

export default BurgerBuilder;
