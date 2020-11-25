import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Aux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrHandler from '../../hoc/withErrHandler/WithErrHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
	state = {
		// ingredients: null,
		// totalPrice: 3,
		// purchasable: false,
		checkout: false,
		loading: false,
		errMsg: false,
	};

	componentDidMount() {
		console.log(this.props);
		// axios
		// 	.get('/ingredients.json')
		// 	.then((res) => this.setState({ ingredients: res.data }))
		// 	.catch((error) => this.setState({ errMsg: true }));
	}

	updatePurchasableState(ingredients) {
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
	}

	checkoutHandler = () => {
		this.setState({ checkout: true });
	};

	resetCheckoutState = () => {
		this.setState({ checkout: false });
	};

	continueCheckoutState = () => {
		this.props.history.push('/checkout');
	};

	render() {
		const disableRemoveIg = {
			...this.props.igs,
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
		if (this.props.igs) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.igs} />
					<BuildControls
						addIngredients={this.props.addIgs} // takes in igName from BuildControls component
						removeIngredients={this.props.removeIgs}
						disableRemoveIg={disableRemoveIg}
						totalPrice={this.props.price}
						purchasable={this.updatePurchasableState(this.props.igs)}
						checkout={this.checkoutHandler}
					/>
				</Aux>
			);
			orderSummary = (
				<OrderSummary
					ingredients={this.props.igs}
					continueCheckout={this.continueCheckoutState}
					cancelCheckout={this.resetCheckoutState}
					totalPrice={this.props.price}
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

const mapStateToProps = (state) => {
	return {
		igs: state.ingredients, // get the ingredients from state in redux
		price: state.totalPrice.toFixed(2),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addIgs: (igName) =>
			dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: igName }),
		removeIgs: (igName) =>
			dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: igName }),
	};
};

// connect redux state to this BurgerBuilderComponent
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(WithErrHandler(BurgerBuilder, axios));

// addIngredients = (type) => {
// ingredients
// const startIgQty = this.props.igs[type];
// const updatedIgQty = startIgQty + 1;
// const updatedIg = { ...this.props.igs }; // create a copy of ingredient obj
// updatedIg[type] = updatedIgQty;
// price
// 	const igPriceAddition = ingredientPricesList[type];
// 	const totalPrice = this.state.totalPrice;
// 	const finalPrice = totalPrice + igPriceAddition;
// 	this.setState({ ingredients: updatedIg, totalPrice: finalPrice });
// 	this.updatePurchaseState(updatedIg);
// };

// removeIngredients = (type) => {
// 	// ingredients
// 	const startIgQty = this.props.igs[type];
// 	if (startIgQty <= 0) {
// 		return;
// 	}
// 	const updatedIgQty = startIgQty - 1;
// 	const updatedIg = { ...this.props.igs }; // create a copy of ingredient obj
// 	updatedIg[type] = updatedIgQty;
// 	// price
// 	const igPriceDeduction = ingredientPricesList[type];
// 	const totalPrice = this.state.totalPrice;
// 	const finalPrice = totalPrice - igPriceDeduction;
// 	this.setState({ ingredients: updatedIg, totalPrice: finalPrice });
// 	this.updatePurchaseState(updatedIg);
// };

// continueCheckoutState = () => {
// 	// =====================================
// 	// this.props.history.push('/checkout');
// 	// push the page/component to the stack
// 	// =====================================
// 	const queryParams = [];
// 	for (let i in this.props.igs) {
// 		queryParams.push(
// 			encodeURIComponent(i) + '=' + encodeURIComponent(this.props.igs[i]),
// 		);
// 	}
// 	queryParams.push('price=' + this.props.price);
// 	const queryString = queryParams.join('&');
// 	this.props.history.push({
// 		pathname: '/checkout',
// 		search: '?' + queryString,
// 	});
// 	// output /checkout?bacon=1&cheese=1&meat=1&salad=1
// };
