import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import VideoPage from './VideoPage';
import '../css/App.css';

const App = () => (
	<main>
		<Switch>
			<Route exact path="/" component={HomePage} />
			<Route path="/videos/:id" component={VideoPage} />
		</Switch>
	</main>
);

export default App;
