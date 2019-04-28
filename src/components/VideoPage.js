import React from 'react';
import axios from 'axios';
import Header from './Header';
import SingleComment from './SingleComment';
import Sidebar from './Sidebar';
import {
	calculateSize,
	calculateSinceUpload,
	formatDate
} from '../utils/VideoUtils';
import '../css/VideoPage.css';

const url = 'https://my-json-server.typicode.com/Campstay/youtube-test/';

class VideoPage extends React.Component {
	_isMounted = false;

	constructor(props) {
		super(props);

		this.state = {
			videoData: [],
			comments: [],
			user: {},
			isLoading: true,
			loadingComments: true
		};
	}

	getVideoData() {
		axios
			.get(url + '/videos/' + this.props.match.params.id, {})
			.then(response => {
				if (this._isMounted) {
					this.setState({ videoData: response.data });
				}

				axios.get(url + '/users/' + response.data.userId, {}).then(response => {
					if (this._isMounted) {
						this.setState({ user: response.data });
					}
				});

				axios
					.get(url + '/comments', {
						params: { videoId: response.data.id, _sort: 'date', _order: 'desc' }
					})
					.then(response => {
						if (this._isMounted) {
							this.setState({
								comments: response.data,
								loadingComments: false
							});
						}
					});
				if (this._isMounted) {
					this.setState({ isLoading: false });
				}
			});
	}

	listComments() {
		const list = this.state.comments.map(comment => {
			return (
				<div className="comment" data-testid="single-comment" key={comment.id}>
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
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		return (
			<div className="VideoPage">
				<span data-testid="video-page" style={{ display: 'none' }}>
					On video page...
				</span>
				<Header />
				{this.state.isLoading ? (
					<div className="loading-text">Loading video...</div>
				) : (
					<div className="ui grid stackable" style={{ marginTop: '20px' }}>
						<div className="one wide column" />
						<div className="ten wide column">
							<video width="100%" src={this.state.videoData.url} controls />
							<h1 className="video-title">{this.state.videoData.title}</h1>
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
								{this.state.isLoading ? (
									<div>Loading comments...</div>
								) : (
									<div className="all-comments" data-testid="comment-cont">
										{this.listComments()}
									</div>
								)}
							</div>
						</div>
						<div className="four wide column">
							<Sidebar videoId={this.props.match.params.id} />
						</div>
						<div className="one wide column" />
					</div>
				)}
			</div>
		);
	}
}

export default VideoPage;
