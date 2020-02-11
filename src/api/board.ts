
import client from './client';
import mock from './mock';
import paths from './paths';

export default {
  loginBoard: async (board: string, pass: string) => {
    if (!paths.validBoard) throw Error("undefined validBoard parameter")
    if (process.env.NODE_ENV === 'development') {
      mock.run(client);
    }
    // eslint-disable-next-line no-return-await
    const result = await client.post(paths.validBoard, { // '/can-open-baord'
      board,
      pass,
    });
    return result.data as boolean;
  },
};
