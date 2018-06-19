import React from 'react';
import App from './app';
import FdmNavigation from './components/FdmNavigation';
import FdmFilter from './components/FdmFilter';
import IndicatorPage from './components/IndicatorPage';

import { Switch, Route } from 'react-router-dom';

const Router = () => (
	<div>
			<FdmNavigation>
			<Switch>
				<Route exact path='/' component={App}/>
				<Route exact path='/:indicatorPage' component={IndicatorPage}/>
			</Switch>
		</FdmNavigation>
	</div>
	)

export default Router;