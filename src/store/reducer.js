import * as actionTypes from './actions';

const initialState = {
	ingredients: {
		salad: 0,
		bacon: 0,
		cheese: 0,
		meat: 0,
	},
	totalPrice: 3,
};

const INGREDIENT_PRICE = {
	salad: 1,
	cheese: 1,
	meat: 2,
	bacon: 1.5,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return {
				...state, // cloning the state first layer, will not clone subObj
				ingredients: {
					// creating a copy of the initialState ingredients
					...state.ingredients, // cloning deeply on the individual object
					// payload: point to this ingredient and alter quantity and price
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
		default:
			return state;
	}
};

export default reducer;
