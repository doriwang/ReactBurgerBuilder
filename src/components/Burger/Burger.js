import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import './Burger.css';

const Burger = (props) => {
	// burger receiving ingredients props from burgerBuilder.js, which is an object and can't be mapped, therefore we need to transform it into an array to be mapped.
	// object.keys takes the keys of a object and transfer to an array: ingredients.salad. salad is a key and now a string in transformedIngredients array
	let transformedIngredients = Object.keys(props.ingredients)
		.map((ingredient) => {
			// console.log(ingredient); // salad, cheese, meat;
			return [...Array(props.ingredients[ingredient])].map((_, i) => {
				// console.log(props.ingredients[ingredient]); // 1, 1, 1
				return <BurgerIngredient key={ingredient + i} type={ingredient} />;
			});
		})
		.reduce((prev, current) => {
			return prev.concat(current);
		}, []);
	// console.log(transformedIngredients);
	if (transformedIngredients.length === 0) {
		transformedIngredients = <p>Please add burger ingredients!</p>;
	}

	return (
		<div className='burger'>
			<BurgerIngredient type='bread-top' />
			{transformedIngredients}
			<BurgerIngredient type='bread-bottom' />
		</div>
	);
};

export default Burger;
