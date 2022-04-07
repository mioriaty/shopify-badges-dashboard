import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { InitializationPageSuccess } from './types';

interface Params {
  app: any;
  shopDomain: string;
}

const InitialzationServiceFlow = async ({ app, shopDomain }: Params) => {
  const res: AxiosResponse<InitializationPageSuccess> = await fetchAPI.request({
    url: `${app.localOrigin}/initialization`,
    headers: {
      ['X-ShopName']: shopDomain,
    },
  });
  return res.data;
};

export class InitialzationService {
  public async initialization(params: Params) {
    const res = await InitialzationServiceFlow(params);
    return res;
  }
}
