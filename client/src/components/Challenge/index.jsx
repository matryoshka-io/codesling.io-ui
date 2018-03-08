import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

import AddChallenge from './AddChallenge/index.jsx';

class Challenge extends Component {
  state = {
    challenges: []
   }

  componentDidMount() {
    this.fetchAllChallenges();
  }

  fetchAllChallenges = async () => {
    const id = localStorage.getItem('id');
    const { data } = await axios.get(`${process.env.REACT_APP_REST_SERVER_URL}/usersChallenges/${id}`)
    this.setState({ challenges: data.rows });
  }

  render() {
    return (
      <div>
        {this.state.challenges.map(challenge => {
          return (
            <div>
              <li>content: {challenge.content} </li>
              <li>difficulty: {challenge.difficulty} </li>
            </div>
          )
        })}
      </div>
    );
  }
}

export default Challenge;

{/* <Switch>
  <Route path='/addChallenge' component={AddChallenge} />
</ Switch>    */}