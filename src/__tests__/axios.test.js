import React from 'react';
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

	const { getByTestId } = render(<VideoCollection />);

	const videoContainer = getByTestId('video-cont');
	const allVideos = await waitForElement(() =>
		within(videoContainer).getAllByTestId('SingleVideo')
	);

	setTimeout(() => {
		expect(renderedComponent.find('SingleVideo').length).toEqual(3);
		done();
	}, 0);

	expect(allVideos.length).toBe(3);
	expect(axiosMock.get).toHaveBeenCalledTimes(4);
});

it('calls axios and returns single video data (video page)', async () => {
	axiosMock.get.mockImplementation(url => {
		if (url === baseURL + '/videos/') {
			return Promise.resolve({ data: axiosResponse.videos });
		} else {
			return Promise.resolve({ data: axiosResponse.users[0] });
		}
	});

	const { getByTestId } = render(<VideoCollection />);

	const videoContainer = getByTestId('video-cont');
	const allVideos = await waitForElement(() =>
		within(videoContainer).getAllByTestId('SingleVideo')
	);

	setTimeout(() => {
		expect(renderedComponent.find('SingleVideo').length).toEqual(3);
		done();
	}, 0);

	expect(allVideos.length).toBe(3);
	expect(axiosMock.get).toHaveBeenCalledTimes(4);
});
