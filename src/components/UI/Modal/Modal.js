import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';
import styles from './Modal.module.css';

class Modal extends Component {
	// improve performance, re-rendering and update only if
	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextProps.show !== this.props.show ||
			nextProps.children !== this.props.children
		);
	}
	componentDidUpdate() {
		console.log('modal updates');
	}

	render() {
		return (
			<Aux>
				<Backdrop show={this.props.show} clicked={this.props.closeModal} />
				<div
					className={styles.modal}
					style={{
						transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
						opacity: this.props.show ? '1' : '0',
					}}
				>
					{this.props.children}
				</div>
			</Aux>
		);
	}
}

export default Modal;
