import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactInfo.module.css';

class ContactInfo extends Component {
	state = {
		name: '',
		email: '',
		phone: '',
		loading: false,
	};

	orderSubmitHandler = (e) => {
		e.preventDefault();
		console.log(this.props.ingredients);

		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			totalPrice: this.props.totalPrice,
		};
		axios
			.post('/orders.json', order)
			.then((res) => {
				console.log(res), this.setState({ loading: false });
				this.props.history.push('/');
			})
			.catch((error) => {
				console.log(error), this.setState({ loading: false });
			});
	};

	render() {
		let form = (
			<form>
				<input
					className={classes.input}
					type='text'
					name='name'
					placeholder='Name'
				/>
				<input
					className={classes.input}
					type='text'
					name='email'
					placeholder='Email Address'
				/>
				<input
					className={classes.input}
					type='text'
					name='phone'
					placeholder='Phone Number'
				/>
				<Button btnType='success' clicked={this.orderSubmitHandler}>
					ORDER NOW
				</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.contactInfo}>
				<h4>Enter your Contact Info</h4>
				{form}
			</div>
		);
	}
}

export default ContactInfo;
