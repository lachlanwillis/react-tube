import React from 'react';
import axiosMock from 'axios';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {
	render,
	fireEvent,
	cleanup,
	waitForElement,
	within
} from 'react-testing-library';
import App from '../components/App';

const axiosResponse = require('../__fixtures__/db.json');

const baseURL = 'https://my-json-server.typicode.com/Campstay/youtube-test/';

afterEach(cleanup);

function renderWithRouter(
	ui,
	{
		route = '/',
		history = createMemoryHistory({ initialEntries: [route] })
	} = {}
) {
	return {
		...render(<Router history={history}>{ui}</Router>),
		history
	};
}

test('full app rendering/navigating', async () => {
	axiosMock.get.mockImplementation(url => {
		if (url === baseURL + '/videos/') {
			return Promise.resolve({ data: axiosResponse.videos });
		} else if (url === baseURL + '/users/') {
			return Promise.resolve({ data: axiosResponse.users[0] });
		} else {
			return Promise.resolve({ data: axiosResponse.comments.slice(0, 2) });
		}
	});

	const { getByText, getByTestId } = renderWithRouter(<App />);

	const videoContainer = getByTestId('video-cont');
	const collectionPage = getByTestId('collection-page');
	const allVideos = await waitForElement(() =>
		within(videoContainer).getAllByTestId('SingleVideo')
	);
	const whalesVideo = getByText('Whales');

	// we are on the home page
	expect(collectionPage.innerHTML).toMatch('On collection page...');

	// click a video
	const leftClick = { button: 0 };
	fireEvent.click(whalesVideo, leftClick);

	const videoPage = getByTestId('video-page');

	// we are on the video page now
	expect(videoPage.innerHTML).toMatch('On video page...');
});

test('landing on a bad page', () => {
	const { container } = renderWithRouter(<App />, {
		route: '/something-that-does-not-match'
	});

	expect(container.innerHTML).toMatch('<main></main>');
});
