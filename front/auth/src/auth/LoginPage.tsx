import React, {useContext} from 'react';
import {useState} from 'react';
import {Button, Form, FormGroup, Label, Input, Container, Row, Col} from 'reactstrap';
import {AuthContext} from './AuthProvider';
import {getLogger} from '../core';

const log = getLogger('Login');

interface LoginState {
    username?: string;
    password?: string;
}

const LoginPage = () => {
    const {isAuthenticated, isAuthenticating, login, authenticationError} = useContext(AuthContext);
    const [state, setState] = useState<LoginState>({username: '', password: ''});
    const {username, password} = state;

    const handleLogin = () => {
        log('handleLogin...');
        login?.(username, password);
    };
    log('render');

    return (
        <Container className="mt-5">
            <Row>
                <Col sm={{size: 6, offset: 3}}>
                    <Form>
                        <FormGroup className="mt-5">
                            <Label for="username">Username</Label>
                            <Input type="text" name="username" id="username" value={state.username}
                                   className="input-field"
                                   onChange={e => setState({
                                       ...state,
                                       username: e.target.value || ''
                                   })}/>
                        </FormGroup>
                        <FormGroup className="mt-5">
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" value={state.password}
                                   className="input-field"
                                   onChange={e => setState({
                                       ...state,
                                       password: e.target.value || ''
                                   })}/>
                        </FormGroup>
                        <div className="btn-container">
                            <Button color="primary" onClick={handleLogin}>Login</Button>
                        </div>
                        {authenticationError && (
                            <div>{authenticationError.message || 'Failed to authenticate'}</div>
                        )}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
