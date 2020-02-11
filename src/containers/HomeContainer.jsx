import React from 'react';
import { logout } from '../services/user';

class LoginContainer extends React.Component {

    handleLogout = () => {
        logout()
            .then(() => {
                localStorage.removeItem('session_token');
                this.props.history.push('/login');
            })
            .catch((e) => console.log(e))
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
