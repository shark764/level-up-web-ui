import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { useGlobalStyles } from '@styles/global';
import { useGlobalTextStyles } from '@styles/text';
import { Layout } from '@modules/layout';
import { Home } from '@modules/home';
import { Facilities } from '@modules/facilities';
import { Zones } from '@modules/zones';
import { Devices } from '@modules/devices';

export const App = () => {
  useGlobalStyles();
  useGlobalTextStyles();

  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/facilities'>
            <Facilities />
          </Route>
          <Route path='/zones'>
            <Zones />
          </Route>
          <Route path='/devices'>
            <Devices />
          </Route>
          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};
