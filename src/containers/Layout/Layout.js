import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidebar from '../../components/Navigation/Sidebar/Sidebar';
import './Layout.css';

class Layout extends Component {
	state = {
		showSideBar: false,
	};

	sidebarCloseHandler = () => {
		this.setState({ showSideBar: false });
	};

	sidebarToggleHandler = () => {
		this.setState((prevState) => {
			return { showSideBar: !prevState.showSideBar };
		});
	};

	render() {
		return (
			<Aux>
				<Toolbar sidebarToggle={this.sidebarToggleHandler} />
				<Sidebar
					open={this.state.showSideBar}
					closeSidebar={this.sidebarCloseHandler}
				/>
				<main className='content'>{this.props.children}</main>
			</Aux>
		);
	}
}

export default Layout;
