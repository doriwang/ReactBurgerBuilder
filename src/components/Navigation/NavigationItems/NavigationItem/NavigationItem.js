import React from 'react';
import './NavigationItem.css';

const NavigationItem = (props) => (
	<li className='navigationItem'>
		<a href={props.link} className={props.active ? 'active' : null}>
			{props.children}
		</a>
	</li>
);

export default NavigationItem;
