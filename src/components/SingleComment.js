import React from 'react';
import video from '../api/video';
import { formatDate } from '../utils/VideoUtils';

class SingleComment extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: []
		};
	}

	getUser(userId) {
		video.get('/users/' + userId, {}).then(response => {
			this.setState({ user: response.data });
		});
	}

	componentDidMount() {
		this.getUser(this.props.data.userId);
	}

	render() {
		return (
			<div className="content">
				<div className="author">{this.state.user.name}</div>
				<div className="metadata">
					<span className="date">{formatDate(this.props.data.date)}</span>
				</div>
				<div className="text">{this.props.data.body}</div>
			</div>
		);
	}
}

export default SingleComment;
