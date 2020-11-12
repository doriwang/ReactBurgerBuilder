import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';
import './Modal.css';

class Modal extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.show !== this.props.show;
	}

	componentDidUpdate() {
		console.log('modal updates');
	}

	render() {
		return (
			<Aux>
				<Backdrop show={this.props.show} clicked={this.props.closeModal} />
				<div
					className='modal'
					style={{
						transform: this.props.show ? 'translateY(0)' : 'translateY(-100)',
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