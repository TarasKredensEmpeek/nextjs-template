import { AccountInfo } from '@/types/account';
import { Action } from '@services/stateProvider';
import createReducer from '@services/stateProvider/createReducer';
import creteAsyncAction from '@services/stateProvider/creteAsyncAction';

export interface AccountState {
  accountInfo?: AccountInfo;
}

const getAc = creteAsyncAction('getAcc', async () => null);

const accountReducer = createReducer({
  name: 'account',
  reducers: {
    // example dynamic as cases
    updateAccount: (state, action: Action<AccountInfo>) => ({
      ...state,
      accountInfo: action.payload || state.accountInfo,
    }),
  },
  // example async/extra reducer cases
  extraReducers: {
    [getAc.pending]: state => state,
  },
});

export const { updateAccount } = accountReducer.actions;
export default accountReducer.reducer;
