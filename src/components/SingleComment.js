import React from 'react';
import axios from 'axios';
import { formatDate } from '../utils/VideoUtils';

const url = 'https://my-json-server.typicode.com/Campstay/youtube-test/';

class SingleComment extends React.Component {
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			user: []
		};
	}

	getUser(userId) {
		axios.get(url + '/users/' + userId, {}).then(response => {
			if (this._isMounted) {
				this.setState({ user: response.data });
			}
		});
	}

	componentDidMount() {
		this.getUser(this.props.data.userId);
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
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
