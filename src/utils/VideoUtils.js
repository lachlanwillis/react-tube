import math from 'mathjs';
import moment from 'moment';

export function calculateSize(size) {
	return math.round(size * 0.001, 2);
}

export function calculateSinceUpload(uploaded) {
	var date = moment(uploaded);
	var today = moment();
	var timeSince = today.diff(date, 'days') + ' days';

	if (timeSince > 364) {
		timeSince = today.diff(date, 'years') + ' years';
	}

	return timeSince;
}

export function formatDate(uploaded) {
	var date = moment(uploaded).format('MMM DD, YYYY');

	return date;
}
