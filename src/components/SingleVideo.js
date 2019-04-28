import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { calculateSize, calculateSinceUpload } from '../utils/VideoUtils';
import '../css/SingleVideo.css';

const url = 'https://my-json-server.typicode.com/Campstay/youtube-test/';

class SingleVideo extends React.Component {
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			user: []
		};
	}

	getUser(userId) {
		axios.get(url + '/users/' + userId).then(response => {
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
			<div className="SingleVideo" key={this.props.data.id}>
				<Link className="ui card" to={'/videos/' + this.props.data.id}>
					<div className="video">
						<video
							width="100%"
							src={`${this.props.data.url}#t=0.5`}
							preload="metadata"
						/>
					</div>
					<div className="content">
						<div className="header">{this.props.data.title}</div>
						<div className="description">by {this.state.user.name}</div>
						<div className="description">
							<span className="size">
								{calculateSize(this.props.data.size)} MBs{' '}
							</span>
							&#xb7;{' '}
							<span className="uploaded">
								{calculateSinceUpload(this.props.data.uploadedAt)} ago
							</span>
						</div>
					</div>
				</Link>
			</div>
		);
	}
}

export default SingleVideo;
