import React, { Component } from 'react';
import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Aux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrHandler from '../../hoc/withErrHandler/WithErrHandler';

const ingredientPricesList = {
	salad: 1,
	cheese: 1,
	meat: 2,
	bacon: 1.5,
};

class BurgerBuilder extends Component {
	state = {
		ingredients: null, // can be altered in firebase
		totalPrice: 3,
		purchasable: false,
		checkout: false,
		loading: false,
		errMsg: false,
	};

	componentDidMount() {
		console.log(this.props);
		axios
			.get('/ingredients.json')
			.then((res) => this.setState({ ingredients: res.data }))
			.catch((error) => this.setState({ errMsg: true }));
	}
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
		// =====================================
		// this.props.history.push('/checkout');
		// push the page/component to the stack
		// =====================================
		const queryParams = [];
		for (let i in this.state.ingredients) {
			queryParams.push(
				encodeURIComponent(i) +
					'=' +
					encodeURIComponent(this.state.ingredients[i]),
			);
		}
		queryParams.push('price=' + this.state.totalPrice);
		const queryString = queryParams.join('&');
		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString,
		});
		// output /checkout?bacon=1&cheese=1&meat=1&salad=1
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

		let orderSummary = null;
		let burger = this.state.errMsg ? (
			<p>Ingredients cannot be loaded...</p>
		) : (
			<Spinner />
		);
		if (this.state.ingredients) {
			burger = (
				<Aux>
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
			orderSummary = (
				<OrderSummary
					ingredients={this.state.ingredients}
					continueCheckout={this.continueCheckoutState}
					cancelCheckout={this.resetCheckoutState}
					totalPrice={this.state.totalPrice.toFixed(2)}
				/>
			);
		}
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		return (
			<Aux>
				<Modal show={this.state.checkout} closeModal={this.resetCheckoutState}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

export default WithErrHandler(BurgerBuilder, axios);
