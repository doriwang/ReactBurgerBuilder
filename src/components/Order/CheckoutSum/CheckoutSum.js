import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSum.module.css';

const CheckoutSum = (props) => {
	return (
		<div className={classes.CheckoutSum}>
			<h1>Checkout Summary</h1>
			<div style={{ width: '100%', margin: 'auto' }}>
				<Burger ingredients={props.ingredients} />
			</div>
			<Button btnType='danger' clicked={props.cancelCheckout}>
				CANCEL
			</Button>
			<Button btnType='success' clicked={props.continueCheckout}>
				CONTINUE
			</Button>
		</div>
	);
};

export default CheckoutSum;
