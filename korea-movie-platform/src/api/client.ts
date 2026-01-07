import ky from 'ky';

const API_BASE = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest';
const API_KEY = import.meta.env.VITE_KOBIS_API_KEY;

export const apiClient = ky.create({
  prefixUrl: API_BASE,
  timeout: 10000,
  hooks: {
    beforeRequest: [
      (request) => {
        const url = new URL(request.url);
        url.searchParams.set('key', API_KEY);
        return new Request(url.toString(), request);
      },
    ],
  },
});
