import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';
import { ResponseSuccess as GetAutomaticsSuccess } from '../AutomaticAPI';
import { Params as CreateParams } from '../CreateBadgeAutomaticAPI';
import { Params as UpdateParams } from '../UpdateBadgeAutomaticAPI';
import { Params as DeleteParams } from '../DeleteBadgeAutomaticAPI';

export const getAutomatics = createAsyncAction([
  '@Automatic/getAutomaticsRequest',
  '@Automatic/getAutomaticsSuccess',
  '@Automatic/getAutomaticsFailure',
  '@Automatic/getAutomaticsCancel',
])<undefined, { automatics: GetAutomaticsSuccess['data']['items'] }, undefined>();

export const createAutomatic = createAsyncAction([
  '@Automatic/createAutomaticsRequest',
  '@Automatic/createAutomaticsSuccess',
  '@Automatic/createAutomaticsFailure',
])<CreateParams, CreateParams, CreateParams>();

export const updateAutomatic = createAsyncAction([
  '@Automatic/updateAutomaticsRequest',
  '@Automatic/updateAutomaticsSuccess',
  '@Automatic/updateAutomaticsFailure',
])<UpdateParams, UpdateParams, UpdateParams>();

export const deleteAutomatic = createAsyncAction([
  '@Automatic/deleteAutomaticsRequest',
  '@Automatic/deleteAutomaticsSuccess',
  '@Automatic/deleteAutomaticsFailure',
])<DeleteParams, DeleteParams, DeleteParams>();

export const useGetAutomatics = createDispatchAsyncAction(getAutomatics);
export const useCreateAutomatic = createDispatchAsyncAction(createAutomatic);
export const useUpdateAutomatic = createDispatchAsyncAction(updateAutomatic);
export const useDeleteAutomatic = createDispatchAsyncAction(deleteAutomatic);
