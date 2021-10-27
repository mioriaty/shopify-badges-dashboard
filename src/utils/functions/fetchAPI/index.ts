import qs from 'qs';
import { CANCEL } from 'redux-saga';
import { Reducers } from 'store/configureStore';
import { ConfigureAxios } from './ConfigureAxios';

const axiosConfig = new ConfigureAxios({
  configure: {
    method: 'GET',
    paramsSerializer: qs.stringify,
  },
  setInitializationApp: () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { store } = require('store/configureStore');
    const {
      initialization: { token, url },
    } = store.getState() as Reducers;

    return {
      accessToken: token || '',
      baseUrl: url || '',
    };
  },
});

const fetchAPI = axiosConfig.create(CANCEL);

export default fetchAPI;
