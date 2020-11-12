import React, { PureComponent } from 'react';
import Aux from './hoc/Aux';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends PureComponent {
	render() {
		return (
			<Aux>
				<Layout>
					<BurgerBuilder />
				</Layout>
			</Aux>
		);
	}
}

export default App;
