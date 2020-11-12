import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

import './Sidebar.css';

const Sidebar = (props) => {
	let attachedClasses = ['sidebar', 'close'];
	if (props.open) {
		attachedClasses = ['sidebar', 'open'];
	}
	return (
		<Aux>
			<Backdrop show={props.open} clicked={props.closeSidebar} />
			<div className={attachedClasses.join(' ')}>
				<Logo height='10%' />
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</Aux>
	);
};

export default Sidebar;
