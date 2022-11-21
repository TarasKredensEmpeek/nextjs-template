import { useContext } from 'react';

import {
  AuthContext,
  AuthProviderState,
  AuthProviderStateKeys,
} from '@services/authProvider';

const useAuthProvider = (
  ...args: AuthProviderStateKeys[]
): AuthProviderState => {
  const authContext = useContext<AuthProviderState>(AuthContext);

  if (args?.length) {
    return args.reduce(
      (acc, authProp) => ({ ...acc, [authProp]: authContext[authProp] }),
      {},
    ) as AuthProviderState;
  }

  return authContext;
};

export default useAuthProvider;
