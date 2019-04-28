import React from 'react';
import Header from './Header';
import SingleComment from './SingleComment';
import Sidebar from './Sidebar';
import video from '../api/video';
import {
	calculateSize,
	calculateSinceUpload,
	formatDate
} from '../utils/VideoUtils';
import '../css/VideoPage.css';

class VideoPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			videoData: [],
			comments: [],
			user: {}
		};
	}

	getVideoData() {
		video.get('/videos/' + this.props.match.params.id, {}).then(response => {
			this.setState({ videoData: response.data });

			video.get('/users/' + response.data.userId, {}).then(response => {
				this.setState({ user: response.data });
			});

			video
				.get('/comments', {
					params: { videoId: response.data.id, _sort: 'date', _order: 'desc' }
				})
				.then(response => {
					this.setState({ comments: response.data });
				});
		});
	}

	listComments() {
		const list = this.state.comments.map(comment => {
			return (
				<div className="comment" key={comment.id}>
					<SingleComment data={comment} />
				</div>
			);
		});

		return list;
	}

	componentDidUpdate(prevProps) {
		if (this.props.match.params.id !== prevProps.match.params.id) {
			this.getVideoData();
		}
	}

	componentDidMount() {
		this.getVideoData();
	}

	render() {
		return (
			<div className="VideoPage">
				<Header />
				<div className="ui grid stackable" style={{ marginTop: '20px' }}>
					<div className="one wide column" />
					<div className="ten wide column">
						<video width="100%" src={this.state.videoData.url} controls />
						<h1>{this.state.videoData.title}</h1>
						<span className="video-meta">
							Uploaded by: {this.state.user.name} &#xb7;{' '}
							{calculateSize(this.state.videoData.size)} MBs &#xb7;{' '}
							{calculateSinceUpload(this.state.videoData.uploadedAt)} ago
						</span>
						<hr />
						<h5 className="user">{this.state.user.name}</h5>
						<span className="video-meta">
							Uploaded on {formatDate(this.state.videoData.uploadedAt)}
						</span>
						<p className="description">{this.state.videoData.description}</p>
						<hr />
						<div className="ui comments">
							<h3 className="ui header">
								{this.state.comments.length} Comments
							</h3>
							{this.listComments()}
						</div>
					</div>
					<div className="four wide column">
						<Sidebar videoId={this.props.match.params.id} />
					</div>
					<div className="one wide column" />
				</div>
			</div>
		);
	}
}

export default VideoPage;
