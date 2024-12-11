export const API_PATH = {
  dev: 'https://dev-back.sanya-it.ru/api/v1',
  test: 'https://test.sanya-it.ru/api/v1',
  production: 'https://sanya-it.ru/api/v1',
};

let backendUrl;
if (location.hostname === 'localhost') {
  backendUrl = API_PATH.dev;
}
if (~location.hostname.indexOf('test')) {
  backendUrl = API_PATH.test;
}
