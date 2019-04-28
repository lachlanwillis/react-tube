import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
	return (
		<div className="Header">
			<div className="ui menu">
				<div className="header item">ReactTube</div>
				<Link to={'/'} className="item">
					Home
				</Link>
			</div>
		</div>
	);
}

export default Header;
