import axios from 'axios';

export default defineNuxtPlugin(() => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
});
