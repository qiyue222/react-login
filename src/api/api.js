import Frisbee from 'frisbee';
const api = new Frisbee({
  baseURI: 'https://gateway.mwuat.com',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
    sysId: 1,
  },
});
export default api;
