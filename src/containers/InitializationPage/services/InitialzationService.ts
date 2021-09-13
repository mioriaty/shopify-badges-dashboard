import { postmessage } from 'postmessage';
// import delay from 'utils/delay';
// import { fakeData } from './fakeData';

let InitialzationServiceSuccess: (() => void) | undefined;
let InitialzationServiceFailure: (() => void) | undefined;

const InitialzationServiceFlow = () => {
  return new Promise<any>((resolve, reject) => {
    InitialzationServiceSuccess?.();
    InitialzationServiceFailure?.();
    InitialzationServiceSuccess = postmessage.on('@InitializationPage/success', data => {
      resolve(data);
      InitialzationServiceSuccess?.();
    });
    InitialzationServiceFailure = postmessage.on('@InitializationPage/failure', () => {
      reject('12: @InitializationPage/failure');
      InitialzationServiceFailure?.();
    });
  });
};

// const DEV_InitialzationServiceFlow = () => {
//   return new Promise<any>(async (resolve, reject) => {
//     InitialzationServiceSuccess?.();
//     InitialzationServiceFailure?.();
//     const random = Math.floor(Math.random() * 10);
//     await delay(1000);
//     if (random > 5) {
//       resolve(fakeData);
//     } else {
//       reject('12: @InitializationPage/failure');
//     }
//   });
// };

export class InitialzationService {
  public async initialization() {
    postmessage.emit('@InitializationPage/request', undefined);
    try {
      const res = await InitialzationServiceFlow();
      return res;
    } catch (err) {
      throw err;
    }
  }
}
