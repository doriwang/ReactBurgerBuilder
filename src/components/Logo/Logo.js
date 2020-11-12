import React from 'react';
import burgerLogo from '../../assets/image/burger-logo.png';
import './Logo.css';

const Logo = (props) => (
	<div className='logo' style={{ height: props.height }}>
		<img src={burgerLogo} alt='burger-logo'></img>
	</div>
);

export default Logo;
