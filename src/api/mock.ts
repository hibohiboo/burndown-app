// eslint-disable-next-line import/no-extraneous-dependencies
import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import paths from './paths';

export default {
  run: (client: AxiosInstance) => {
    const mock = new MockAdapter(client);

    mock.onPost(paths.validBoard).reply((req) => {
      const { board, pass } = JSON.parse(req.data);
      return [200, board === pass];
    });
  },
};
