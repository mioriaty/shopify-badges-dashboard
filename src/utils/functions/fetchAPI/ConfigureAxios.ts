import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

type SetInitializationApp = () => {
  accessToken: string;
  baseUrl: string;
};
interface Configure {
  configure: AxiosRequestConfig;
  setInitializationApp: SetInitializationApp;
}

const { CancelToken } = axios;

export class ConfigureAxios {
  private axiosInstance: AxiosInstance;

  public constructor({ configure, setInitializationApp }: Configure) {
    this.axiosInstance = axios.create(configure);
    this.axiosInstance.interceptors.request.use(async config => {
      const { accessToken, baseUrl } = setInitializationApp();

      config.baseURL = baseUrl;
      config.headers.Authorization = `Basic ${accessToken}`;
      return config;
    });
  }

  public create = (cancel = '') => {
    return {
      request: (requestConfig: AxiosRequestConfig) => {
        const source = CancelToken.source();
        const request = this.axiosInstance({ ...requestConfig, cancelToken: source.token });
        if (!!cancel) {
          // @ts-ignore
          request[cancel] = source.cancel;
        }
        return request;
      },
    };
  };
}
