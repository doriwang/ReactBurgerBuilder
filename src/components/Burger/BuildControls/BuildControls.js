import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import './BuildControls.css';

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' },
	{ label: 'Bacon', type: 'bacon' },
];
const BuildControls = (props) => {
	return (
		<div className='buildControls'>
			{controls.map((control) => (
				<BuildControl
					key={control.label}
					label={control.label}
					add={() => props.addIngredients(control.type)}
					remove={() => props.removeIngredients(control.type)}
					disable={props.disableRemoveIg[control.type]}
				/>
			))}
			<h3>{`Total Price: $${props.totalPrice}`}</h3>
			<button
				className='checkoutButton'
				disabled={!props.purchaseable}
				onClick={props.checkout}
			>
				Checkout
			</button>
		</div>
	);
};

export default BuildControls;
