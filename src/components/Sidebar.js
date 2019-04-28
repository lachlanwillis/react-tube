import React from 'react';
import SingleVideo from './SingleVideo';
import axios from 'axios';
import '../css/Sidebar.css';

const url = 'https://my-json-server.typicode.com/Campstay/youtube-test/';

class VideoCollection extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			videos: []
		};
	}

	getVideoList() {
		axios.get(url + '/videos?id_ne=' + this.props.videoId).then(response => {
			this.setState({ videos: response.data });
		});
	}

	listVideos() {
		const list = this.state.videos.map(video => {
			return (
				<div className="sidebarVideo" key={video.id}>
					<SingleVideo data={video} />
				</div>
			);
		});

		return list;
	}

	componentDidUpdate(prevProps) {
		if (this.props.videoId !== prevProps.videoId) {
			this.getVideoList();
		}
	}

	componentDidMount() {
		this.getVideoList();
	}

	render() {
		return (
			<div className="sidebar">
				<h3 className="ui header">Watch Next</h3>
				{this.listVideos()}
			</div>
		);
	}
}

export default VideoCollection;
