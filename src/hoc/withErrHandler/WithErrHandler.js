import React, { Component } from 'react';
import Aux from '../Aux';
import Modal from '../../components/UI/Modal/Modal';

const WithErrHandler = (WrappedComponent, axios) => {
	return class extends Component {
		constructor(props) {
			super(props);
			this.state = { error: null };
		}
		// state = {
		// 	error: null,
		// };
		// will execute before component mounts vs DidMount which execute after components mount
		componentDidMount() {
			this.reqInterceptors = axios.interceptors.request.use((req) => {
				this.setState({ error: null });
				return req;
			});
			this.resInterceptors = axios.interceptors.response.use(
				(res) => res,
				(err) => {
					this.setState({ error: err });
				},
			);
		}
		component;
		// above interceptors instance will be called every time when WithErrHandler is called, which creates multiple instances and can cause errors or memory leaks. This will prevent such issues.
		componentWillUnmount() {
			axios.interceptors.request.eject(this.reqInterceptors);
			axios.interceptors.response.eject(this.resInterceptors);
		}
		errConfirmedHandler = () => {
			this.setState({ error: null });
		};
		render() {
			return (
				<Aux>
					<Modal show={this.state.error} closeModal={this.errConfirmedHandler}>
						Oops... Something went wrong...{' '}
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</Aux>
			);
		}
	};
};

export default WithErrHandler;
