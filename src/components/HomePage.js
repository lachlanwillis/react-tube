import React from 'react';
import Header from './Header';
import VideoCollection from './VideoCollection';

class HomePage extends React.Component {
	render() {
		return (
			<div>
				<Header />
				<VideoCollection />
			</div>
		);
	}
}

export default HomePage;
