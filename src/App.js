import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import LoginContainer from './containers/LoginContainer';
import HomeContainer from './containers/HomeContainer';

import './App.css';

const PrivateRoute = ({ component: ComponentToRender }) => (
    <Route
        render={(props) => {
            if (!localStorage.getItem('user')) {
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
