import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import LoginContainer from './containers/LoginContainer';
import HomeContainer from './containers/HomeContainer';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './App.css';

const PrivateRoute = ({ component: ComponentToRender, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            if (!localStorage.getItem('session_token')) {
                return <Redirect to="/login" />;
            }
            return <ComponentToRender {...props} />;
        }}
    />
);

const App = () => (
  <BrowserRouter>
    <Route path='/login' component={LoginContainer} />
    <PrivateRoute path='/' component={HomeContainer} />
  </BrowserRouter>
);

export default App;
