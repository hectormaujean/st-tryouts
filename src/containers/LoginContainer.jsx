import React from 'react';
import { Redirect } from 'react-router-dom';

class LoginContainer extends React.Component {
    render() {
        if (localStorage.getItem('user')) {
            return <Redirect to='/' />
        }

        return (
            <div>
                Login please
            </div>
        )
    }
}

export default LoginContainer;
