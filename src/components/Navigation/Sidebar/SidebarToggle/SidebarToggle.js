import React from 'react';
import './SidebarToggle.css';

const SidebarToggle = (props) => (
	<div className='sidebarToggle' onClick={props.clicked}>
		<div></div>
		<div></div>
		<div></div>
	</div>
);

export default SidebarToggle;
