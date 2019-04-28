import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, within, cleanup, waitForElement } from 'react-testing-library';
import 'jest-dom/extend-expect';
import axiosMock from 'axios';
import VideoCollection from '../components/VideoCollection';
import VideoPage from '../components/VideoPage';

const axiosResponse = require('../__fixtures__/db.json');

const baseURL = 'https://my-json-server.typicode.com/Campstay/youtube-test/';

afterEach(cleanup);

it('calls axios and returns video data (home page)', async () => {
	axiosMock.get.mockImplementation(url => {
		if (url === baseURL + '/videos/') {
			return Promise.resolve({ data: axiosResponse.videos });
		} else {
			return Promise.resolve({ data: axiosResponse.users[0] });
		}
	});

	const { getByTestId } = render(
		<BrowserRouter>
			<VideoCollection />
		</BrowserRouter>
	);

	const videoContainer = getByTestId('video-cont');
	const allVideos = await waitForElement(() =>
		within(videoContainer).getAllByTestId('SingleVideo')
	);

	expect(allVideos.length).toBe(3);
	expect(axiosMock.get).toHaveBeenCalledTimes(4);
});

const match = {
	params: {
		id: 0
	}
};

it('calls axios and returns single video data (video page)', async () => {
	axiosMock.get.mockImplementation(url => {
		if (url === baseURL + '/videos/') {
			return Promise.resolve({ data: axiosResponse.videos[0] });
		} else if (url === baseURL + '/users/') {
			return Promise.resolve({ data: axiosResponse.users[0] });
		} else {
			return Promise.resolve({ data: axiosResponse.comments.slice(0, 2) });
		}
	});

	const { getByTestId } = render(
		<BrowserRouter>
			<VideoPage match={match} />
		</BrowserRouter>
	);

	const commentContainer = await waitForElement(() =>
		getByTestId('comment-cont')
	);
	const allComments = await waitForElement(() =>
		within(commentContainer).getAllByTestId('single-comment')
	);

	expect(allComments.length).toBe(2);
	expect(axiosMock.get).toHaveBeenCalledTimes(12);
});
