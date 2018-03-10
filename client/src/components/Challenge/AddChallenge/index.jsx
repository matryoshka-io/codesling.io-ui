import React, { Component } from 'react';
import axios from 'axios';

import Input from '../../globals/forms/Input';
import Button from '../../globals/Button/';
import Logo from '../../globals/Logo';

import './Auth.css';

const { REACT_APP_REST_SERVER_URL } = process.env;

class AddChallenge extends Component {
  state = {
    title: '',
    content: '',
    testCase: '',
    difficulty: null
   }

  submitChallenge = async (e) => {
    e.preventDefault();
    const { title, content, difficulty, testCase } = this.state;
    const id = localStorage.getItem('id');
    const body = {
      title,
      content,
      difficulty,
      testCase,
      user_id: id,
      type: 0
    }
    const result = await axios.post(`${REACT_APP_REST_SERVER_URL}/api/challenges`, body);
    this.props.history.push('/home');
  }

  handleChallengeInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="login-form-container">
        <Logo
          className="landing-page-logo"
        />
        <form className="auth-form">
          <Input
            name='title'
            type='title'
            placeholder={'enter title'}
            onChange={this.handleChallengeInput}
            />
          <Input
            name='content'
            type='content'
            placeholder={'enter content'}
            onChange={this.handleChallengeInput}
            />
          <Input
            name='difficulty'
            type='difficulty'
            placeholder={'enter your difficulty'}
            onChange={this.handleChallengeInput}
            />
          <textarea
            name='testCase'
            type='testCase'
            placeholder={'write your test case'}
            onChange={this.handleChallengeInput}
            />
          <Button
            backgroundColor="red"
            color="white"
            text="Add Challenge"
            onClick={(e) => this.submitChallenge(e)}
            />
        </form>
      </div>
    );
  }
}

export default AddChallenge;
