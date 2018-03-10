import React, { Component } from 'react';
import axios from 'axios';

import Input from '../globals/forms/Input';
import Button from '../globals/Button/';

import './Auth.css';

const { REACT_APP_REST_SERVER_URL } = process.env;

export default class Signup extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      username: ''
    }
  }

  submitAuthData = async (e) => {
    e.preventDefault();
    const { email, password, username } = this.state;
    const body = {
      email,
      password,
      username
    }
    try {
      const data = await axios.post(`${REACT_APP_REST_SERVER_URL}/api/auth/signup`, body);
      data ? this.props.history.push('/login') : this.props.history.push('/auth');
    } catch (err) {
      throw new Error(err);
    }
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="login-form-container">
        <form className="auth-form">
          <Input
            name='email'
            type='email'
            placeholder={'enter email'}
            onChange={this.handleInputChange}
            />
          <Input
            name='username'
            type='username'
            placeholder={'enter your username'}
            onChange={this.handleInputChange}
            />
          <Input
            name='password'
            type='password'
            placeholder={'enter your password'}
            onChange={this.handleInputChange}
            />
          <Button
            backgroundColor="red"
            color="white"
            text="Sign Up"
            onClick={(e) => this.submitAuthData(e)}
            />
        </form>
      </div>
    )
  }
}
