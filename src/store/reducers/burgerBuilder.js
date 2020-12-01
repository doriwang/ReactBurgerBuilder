import * as actionTypes from '../actions/actionTypes';

const initialState = {
	ingredients: null,
	totalPrice: 3,
	error: false,
};

const INGREDIENT_PRICE = {
	salad: 1,
	cheese: 1,
	meat: 2,
	bacon: 1.5,
};

const BurgerBuilderReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return {
				...state, // cloning the state first layer, will not clone subObj
				ingredients: {
					// creating a copy of the initialState ingredients
					...state.ingredients, // cloning deeply on the individual object
					// payload: point to this ingredient and alter quantity and price; [] indicate the property is a variable and can be any ingredientName
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1,
				},
				totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
			};
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1,
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
			};
		case actionTypes.SET_INGREDIENTS:
			return {
				...state,
				ingredients: {
					salad: action.ingredients.salad,
					bacon: action.ingredients.bacon,
					cheese: action.ingredients.cheese,
					meat: action.ingredients.meat,
				},
				totalPrice: 3,
				error: false, // reset error state
			};
		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return {
				...state,
				error: true,
			};
		default:
			return state;
	}
};

export default BurgerBuilderReducer;
