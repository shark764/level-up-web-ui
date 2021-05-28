import React, { useContext, createContext, ReactNode } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useStickyState } from '@modules/common/hooks';

interface AuthContext {
  isAuthenticated: boolean;
  user: { id: string; name: string; role: string };
  signIn: (username: string, callback: () => void) => void;
  signOut: (callback: () => void) => void;
}

const authMethods = {
  isAuthenticated: false,
  signIn(callback: () => void) {
    authMethods.isAuthenticated = true;
    // Fake async
    setTimeout(callback, 100);
  },
  signOut(callback: () => void) {
    authMethods.isAuthenticated = false;
    setTimeout(callback, 100);
  }
};

const AuthContext = createContext<AuthContext>({} as AuthContext);

export const useAuth = () => useContext(AuthContext);

const useAuthProvider = () => {
  // const [user, setUser] = useState({ id: '', name: '', role: '' });
  const [user, setUser] = useStickyState(
    { id: '', name: '', role: '' },
    'auth:user'
  );

  const signIn = (username: string, callback: () => void) =>
    authMethods.signIn(() => {
      setUser({ id: 'TODO', name: username, role: 'Super-Admin' });
      callback();
    });

  const signOut = (callback: () => void) =>
    authMethods.signOut(() => {
      setUser({ id: '', name: '', role: '' });
      callback();
    });

  return {
    isAuthenticated: !!user.id && !!user.name,
    user,
    signOut,
    signIn
  };
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const PrivateRoute = ({
  children,
  ...rest
}: {
  children: ReactNode;
} & RouteProps) => {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};
