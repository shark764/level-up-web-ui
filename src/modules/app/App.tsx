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
import {
  Facilities,
  Facility,
  Create as CreateFacility
} from '@modules/facilities';
import { Zones, Zone, Create as CreateZone } from '@modules/zones';
import { Devices, Device, Create as CreateDevice } from '@modules/devices';

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
          {/* TODO: add private routes to an array and iterate over that */}
          <Layout>
            <Switch>
              <PrivateRoute exact path='/'>
                <Home />
              </PrivateRoute>
              {/* Facilities */}
              <PrivateRoute path='/facilities/create'>
                <CreateFacility />
              </PrivateRoute>
              <PrivateRoute path='/facilities/:id'>
                <Facility />
              </PrivateRoute>
              <PrivateRoute path='/facilities'>
                <Facilities />
              </PrivateRoute>

              {/* Zones */}

              <PrivateRoute path='/zones/create'>
                <CreateZone />
              </PrivateRoute>
              <PrivateRoute path='/zones/:id'>
                <Zone />
              </PrivateRoute>
              <PrivateRoute path='/zones'>
                <Zones />
              </PrivateRoute>

              {/* Devices */}
              <PrivateRoute path='/devices/create'>
                <CreateDevice />
              </PrivateRoute>
              <PrivateRoute path='/devices/:id'>
                <Device />
              </PrivateRoute>
              <PrivateRoute path='/devices'>
                <Devices />
              </PrivateRoute>
              <Route path='*'>
                <Redirect to='/' />
              </Route>
            </Switch>
          </Layout>
        </Switch>
      </Router>
    </AuthContextProvider>
  );
};
