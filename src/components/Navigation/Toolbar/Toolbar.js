import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SidebarToggle from '../Sidebar/SidebarToggle/SidebarToggle';
import './Toolbar.css';

const Toolbar = (props) => {
	return (
		<header className='toolbar'>
			{/* <div onClick={props.openSidebar}>MENU</div> */}
			<SidebarToggle clicked={props.sidebarToggle} />
			<Logo height='80%' />
			<nav className='deskTopOnly'>
				<NavigationItems />
			</nav>
		</header>
	);
};

export default Toolbar;
