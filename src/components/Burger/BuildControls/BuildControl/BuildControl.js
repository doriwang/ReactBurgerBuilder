import React from 'react';
import './BuildControl.css';

const BuildControl = (props) => {
	return (
		<div className='buildControl'>
			<div className='label'>{props.label}</div>
			<button className='add' onClick={props.add}>
				+
			</button>
			<button
				className='remove'
				onClick={props.remove}
				disabled={props.disable}
			>
				-
			</button>
		</div>
	);
};

export default BuildControl;
