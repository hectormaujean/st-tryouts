import React from 'react';
import { Redirect } from 'react-router-dom';
import { login } from '../services/user';

import { Form } from 'semantic-ui-react';
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
            error: '',
        };
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { username, password } = this.state;

        this.setState({ loading: true }, async () => {
            login(username, password)
                .then(() => {
                    this.setState({ loading: false }, () => this.props.history.push('/'));
                })
                .catch(error => {
                    this.setState({ loading: false }, () => console.log(error));
                })
        })
        
    }

    render() {
        const {
            username,
            password,
            loading,
            error
        } = this.state;

        if (localStorage.getItem('user')) {
            return <Redirect to='/' />
        }

        return (
            <Container>
                <Form onSubmit={this.handleSubmit} loading={loading}>
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
