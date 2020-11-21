import React from 'react';

import classes from './Input.module.css';

const Input = (props) => {
	let inputEl = null;
	let inputClasses = [classes.InputEl];

	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Invalid);
	}

	let validationError = null;
	if (props.invalid && props.touched) {
		validationError = (
			<p className={classes.ValidationError}>Please enter a valid value!</p>
		);
	}

	switch (props.elementType) {
		case 'input':
			inputEl = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.inputChange}
				/>
			);
			break;
		case 'textarea':
			inputEl = (
				<textarea
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.inputChange}
				/>
			);
			break;
		case 'select':
			inputEl = (
				<select
					className={inputClasses.join(' ')}
					value={props.value}
					onChange={props.inputChange}
				>
					{props.elementConfig.options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.displayValue}
						</option>
					))}
				</select>
			);
			break;
		default:
			inputEl = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.inputChange}
				/>
			);
	}

	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputEl}
			{validationError}
		</div>
	);
};

export default Input;
