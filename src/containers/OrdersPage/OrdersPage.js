import React, { Component } from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import WithErrHandler from '../../hoc/withErrHandler/WithErrHandler';

class OrdersPage extends Component {
	state = {
		orders: [],
		loading: true,
	};
	componentDidMount() {
		axios
			.get('/orders.json')
			.then((res) => {
				console.log(res.data);
				const fetchedOrders = [];
				for (let key in res.data) {
					fetchedOrders.push({ ...res.data[key], id: key });
				}
				this.setState({ loading: false, orders: fetchedOrders });
			})
			.catch((err) => {
				this.setState({ loading: false });
			});
	}
	render() {
		console.log(this.state.orders);
		return (
			<div>
				{this.state.orders.map((order) => (
					<Order
						key={order.id}
						ingredients={order.ingredients}
						totalPrice={+order.totalPrice}
					/>
				))}
			</div>
		);
	}
}

export default WithErrHandler(OrdersPage, axios);
