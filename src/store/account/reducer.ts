import { AccountInfo } from '@/types/account';
import { Action } from '@services/stateProvider';
import createReducer from '@services/stateProvider/createReducer';

export interface AccountState {
  accountInfo?: AccountInfo;
}

const accountReducer = createReducer({
  name: 'account',
  reducers: {
    updateAccount: (state, action: Action<AccountInfo>) => ({
      ...state,
      accountInfo: action.payload || state.accountInfo,
    }),
  },
});

export const { updateAccount } = accountReducer.actions;
export default accountReducer.reducer;
