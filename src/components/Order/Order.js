import React from 'react';

import classes from './Order.module.css';

const Order = (props) => {
	const ingredients = [];
	for (let ingredientKey in props.ingredients) {
		ingredients.push({
			key: ingredientKey,
			value: props.ingredients[ingredientKey],
		});
	}
	const ingredientOutput = ingredients.map((ig) => {
		return (
			<span
				key={ig.key}
				style={{
					textTransform: 'capitalize',
					display: 'inline-block',
					margin: '0 8px',
					padding: '5px',
					border: '1px solid #ccc',
				}}
			>
				{ig.key}: {ig.value}
			</span>
		);
	});
	return (
		<div className={classes.order}>
			<p>Ingredients: {ingredientOutput} </p>
			<p>
				Total: <strong>$ {props.totalPrice.toFixed(2)} </strong>
			</p>
		</div>
	);
};

export default Order;
