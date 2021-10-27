import { AxiosError } from 'axios';

interface ErrorData {
  code: number;
  message: string;
  status: string;
}

export default function handleError<T extends AxiosError<ErrorData> | Error>(error: T) {
  if ((error as AxiosError).isAxiosError) {
    const _error = error as AxiosError<ErrorData>;
    console.log(_error);
  } else {
  }
}
