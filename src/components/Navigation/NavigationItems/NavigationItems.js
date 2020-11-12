import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItems.css';

const NavigationItems = (props) => (
	<ul className='navigationItems'>
		<NavigationItem link='/' active>
			Burger Builder
		</NavigationItem>
		<NavigationItem link='/'>Checkout</NavigationItem>
	</ul>
);

export default NavigationItems;
