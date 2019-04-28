const axiosResponse = require('../__fixtures__/db.json');

export default {
	get: jest.fn(() => Promise.resolve({ data: { videos: [] } }))
};
