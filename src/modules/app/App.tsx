import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { useGlobalStyles } from '@styles/global';
import { useGlobalTextStyles } from '@styles/text';
import { AuthContextProvider, Login, PrivateRoute } from '@modules/auth';
import { Layout } from '@modules/layout';
import { Home } from '@modules/home';
import { Facilities, Facility } from '@modules/facilities';
import { Zones } from '@modules/zones';
import { Devices } from '@modules/devices';

export const App = () => {
  useGlobalStyles();
  useGlobalTextStyles();

  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Layout>
            <PrivateRoute exact path='/'>
              <Home />
            </PrivateRoute>
            <PrivateRoute exact path='/facilities'>
              <Facilities />
            </PrivateRoute>
            <PrivateRoute path='/facilities/:id'>
              <Facility />
            </PrivateRoute>
            <PrivateRoute path='/zones'>
              <Zones />
            </PrivateRoute>
            <PrivateRoute path='/devices'>
              <Devices />
            </PrivateRoute>
            <Route path='*'>
              <Redirect to='/' />
            </Route>
          </Layout>
        </Switch>
      </Router>
    </AuthContextProvider>
  );
};
