import React, { Component } from 'react';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrHandler from '../../../hoc/withErrHandler/WithErrHandler';
import * as orderActionTypes from '../../../store/actions';
import classes from './ContactInfo.module.css';

class ContactInfo extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Name',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Email',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			phone: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Phone',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			city: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'City',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			state: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'State',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Zip Code',
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5,
				},
				valid: false,
				touched: false,
			},
			orderType: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'pickup', displayValue: 'Pickup' },
						{ value: 'delivery', displayValue: 'Delivery' },
					],
				},
				validation: {},
				value: 'pickup',
				valid: true,
			},
		},
		formIsValid: false,
	};

	inputChangeHandler = (e, inputIdentifier) => {
		// via name, email, phone ...so on
		const copiedOrderForm = {
			...this.state.orderForm, // create a copy of the mainObj in orderForm
		};
		const copiedOrderFormEl = {
			...copiedOrderForm[inputIdentifier], // access each mainObj key and its subObj in the form, goes to one layer deeper on the objects
		};
		copiedOrderFormEl.value = e.target.value; // capture user's input value in subObj
		copiedOrderForm[inputIdentifier] = copiedOrderFormEl; // store in the mainObj
		copiedOrderFormEl.valid = this.checkValidity(
			copiedOrderFormEl.value, // evaluate if the input value !== ''
			copiedOrderFormEl.validation, // if the element/obj has a validation property
		);
		copiedOrderFormEl.touched = true;

		let formIsValid = true;
		for (let key in copiedOrderForm) {
			formIsValid = copiedOrderForm[key].valid && formIsValid;
		}
		this.setState({ orderForm: copiedOrderForm, formIsValid: formIsValid });
	};

	checkValidity = (value, rules) => {
		let isValid = true;
		if (rules.required) {
			// check if the obj has a required property
			isValid = value.trim() !== '' && isValid; // if it does, check if the value is not equal to an empty string, will return true or false
		}
		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}
		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}
		return isValid;
	};

	orderSubmitHandler = (e) => {
		e.preventDefault();
		// this.setState({ loading: true });
		const orderFormData = {};
		for (let key in this.state.orderForm) {
			orderFormData[key] = this.state.orderForm[key].value; // creating value pairs
		}
		const order = {
			ingredients: this.props.igs,
			totalPrice: this.props.price,
			orderData: orderFormData,
		};
		this.props.orderBurger(order);
		// axios
		// 	.post('/orders.json', order)
		// 	.then((res) => {
		// 		console.log(res), this.setState({ loading: false });
		// 		this.props.history.push('/');
		// 	})
		// 	.catch((error) => {
		// 		console.log(error), this.setState({ loading: false });
		// 	});
	};

	render() {
		const formElArray = [];
		for (let key in this.state.orderForm) {
			formElArray.push({
				id: key,
				value: this.state.orderForm[key], // the value or subObjKey of each mainObj key
			});
		}
		let form = (
			<form onSubmit={this.orderSubmitHandler}>
				{formElArray.map((formEl) => {
					return (
						<Input
							key={formEl.id}
							elementType={formEl.value.elementType}
							elementConfig={formEl.value.elementConfig}
							value={formEl.value.value}
							invalid={!formEl.value.valid}
							shouldValidate={formEl.value.validation}
							touched={formEl.value.touched}
							inputChange={(e) => this.inputChangeHandler(e, formEl.id)}
						/>
					);
				})}
				<Button btnType='success' disabled={!this.state.formIsValid}>
					ORDER NOW
				</Button>
			</form>
		);
		if (this.props.loading) {
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

const mapStateToProps = (state) => {
	return {
		igs: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice.toFixed(2),
		loading: state.order.loading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		orderBurger: (orderData) =>
			dispatch(orderActionTypes.purchaseBurger(orderData)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withErrHandler(ContactInfo, axios));
