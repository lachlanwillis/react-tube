import React from 'react';
import { render, within, cleanup, waitForElement } from 'react-testing-library';
import 'jest-dom/extend-expect';
import axiosMock from 'axios';
import VideoCollection from '../components/VideoCollection';

const axiosResponse = require('../__fixtures__/db.json');

it('calls axios and returns video data', async () => {
	axiosMock.get.mockImplementationOnce(() =>
		Promise.resolve(axiosResponse.raw)
	);

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
	expect(axiosMock.get).toHaveBeenCalledTimes(1);
	expect(axiosMock.get).toHaveBeenCalledWith('/videos/');
});
