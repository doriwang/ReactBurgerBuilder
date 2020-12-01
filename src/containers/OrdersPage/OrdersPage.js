import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import WithErrHandler from '../../hoc/withErrHandler/WithErrHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class OrdersPage extends Component {
	// state = {
	// 	orders: [],
	// 	loading: true,
	// };
	componentDidMount() {
		this.props.fetchingOrders();
		// axios
		// 	.get('/orders.json')
		// 	.then((res) => {
		// 		console.log(res.data);
		// 		const fetchedOrders = [];
		// 		for (let key in res.data) {
		// 			fetchedOrders.push({ ...res.data[key], id: key });
		// 		}
		// 		this.setState({ loading: false, orders: fetchedOrders });
		// 	})
		// 	.catch((err) => {
		// 		this.setState({ loading: false });
		// 	});
	}
	render() {
		console.log(this.props.orders);
		let orders = <Spinner />;
		if (!this.props.loading) {
			orders = this.props.orders.map((order) => (
				<Order
					key={order.id}
					ingredients={order.ingredients}
					totalPrice={+order.totalPrice}
				/>
			));
		}
		return (
			<div>
				{orders}
				{/* {this.props.orders.map((order) => (
					<Order
						key={order.id}
						ingredients={order.ingredients}
						totalPrice={+order.totalPrice}
					/>
				))} */}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		// action creators
		fetchingOrders: () => dispatch(actions.fetchOrders()),
	};
};
export default connect(
	mapStateToProps, // if no state to map, pass in null
	mapDispatchToProps,
)(WithErrHandler(OrdersPage, axios));
