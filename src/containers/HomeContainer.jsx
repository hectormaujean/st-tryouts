import React from 'react';
import { logout } from '../services/user';

class LoginContainer extends React.Component {

    handleLogout = () => {
        logout()
            .then (
                () => this.props.history.push('/login'),
                error => console.log(error)
            )
    }

    render() {
        return (
            <div>
                Welcome home !
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        )
    }
}

export default LoginContainer;
