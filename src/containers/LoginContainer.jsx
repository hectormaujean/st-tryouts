import React from 'react';
import { Redirect } from 'react-router-dom';
import { login } from '../services/user';

import { Form, Message } from 'semantic-ui-react';
import styled from 'styled-components';

const Container = styled.div`
    height: -webkit-fill-available;
    display: flex;
    justify-content: center;
    align-items: center;
`;
class LoginContainer extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            username: 'urtoob',
            password: 'ToobR',
            loading: false,
            error: false,
        };
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { username, password } = this.state;

        this.setState({ loading: true }, async () => {
            login(username, password)
                .then((response) => {
                    if (response && response.data && response.data.session_token) {
                        localStorage.setItem('session_token', JSON.stringify(response.data.session_token));
                        this.setState({ loading: false, error: false }, () => this.props.history.push('/'));
                    }
                })
                .catch((e) => {
                    if (e.response.status === 404) {
                        this.setState({ loading: false, error: 'credentials' });
                    } else {
                        this.setState({ loading: false, error: 'server' })
                    }
                });
        })
    }

    render() {
        const {
            username,
            password,
            loading,
            error
        } = this.state;

        if (localStorage.getItem('session_token')) {
            return <Redirect to='/' />
        }

        return (
            <Container>
                <Form onSubmit={this.handleSubmit} loading={loading} error={error}>
                    {error === 'credentials' && (
                        <Message
                            error
                            header='Error'
                            content='Incorrect username or password.'
                        />
                    )}
                    {error === 'server' && (
                        <Message
                            error
                            header='Error'
                            content='The server might be down. Try again in few minutes !'
                        />
                    )}
                    <Form.Input
                        label="Username"
                        placeholder="John Doe"
                        type="text"
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        label="Password"
                        placeholder="Your password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                    />
                    <Form.Button disabled={!username || !password}>Submit</Form.Button>
                </Form>
            </Container>
        )
    }
}

export default LoginContainer;
