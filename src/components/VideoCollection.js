import React from 'react';
import SingleVideo from './SingleVideo';
import axios from 'axios';

const url = 'https://my-json-server.typicode.com/Campstay/youtube-test/';

class VideoCollection extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			videos: [],
			isLoading: true
		};
	}

	getVideoList() {
		axios.get(url + '/videos/').then(response => {
			this.setState({ videos: response.data, isLoading: false });
		});
	}

	listVideos() {
		const list = this.state.videos.map(video => {
			return (
				<div
					className="four wide column"
					key={video.id}
					data-testid="SingleVideo"
				>
					<SingleVideo data={video} />
				</div>
			);
		});

		return list;
	}

	componentDidMount() {
		this.getVideoList();
	}

	render() {
		return (
			<div
				className="ui grid centered"
				style={{ margin: '0px' }}
				data-testid="video-cont"
			>
				<div className="sixteen wide column">
					<h2 className="ui header centered" data-testid="home-header">
						Popular Videos
					</h2>
				</div>
				{this.state.isLoading ? (
					<div>Loading videos...</div>
				) : (
					this.listVideos()
				)}
			</div>
		);
	}
}

export default VideoCollection;
