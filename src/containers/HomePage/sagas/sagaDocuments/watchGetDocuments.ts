import { AxiosResponse } from 'axios';
import { getDocuments } from 'containers/HomePage/actions/actionDoucments';
import { call, put, takeLatest } from 'redux-saga/effects';
import fetchAPI from 'utils/functions/fetchAPI';
import { postmessage } from 'utils/posrmessage';
import { getActionType } from 'wiloke-react-core/utils';
import { DocumentsResponse } from '../../DocumentAPI';

function* handleDocument({ payload }: ReturnType<typeof getDocuments.request>) {
  try {
    const response: AxiosResponse<DocumentsResponse> = yield call(fetchAPI.request, {
      url: 'documents',
      params: {
        s: payload.s ?? undefined,
      },
    });
    yield put(getDocuments.success({ documents: response.data.data.items }));
    postmessage.emit('@Document/getDocuments/success', { data: response.data.data.items });
  } catch (error) {
    yield put(getDocuments.failure(undefined));
    postmessage.emit('@Document/getDocuments/failure', undefined);
  }
}

export function* watchGetDocuments() {
  yield takeLatest(getActionType(getDocuments.request), handleDocument);
}
