import React, { Component } from 'react';
import randomstring from 'randomstring';
import axios from 'axios';
import PropTypes from 'prop-types';

import Button from '../globals/Button';
import Logo from '../globals/Logo';

import './LandingPage.css';

const { REACT_APP_REST_SERVER_URL } = process.env;

let slingId;

class Home extends Component {
  state = {
    allChallenges: [],
    selectedChallenge: {},
  };

  async componentDidMount() {
    const id = localStorage.getItem('id');
    const { data } = await axios.get(`${REACT_APP_REST_SERVER_URL}/api/usersChallenges/${id}`);
    const { data: { clout } } = await axios.get(`${REACT_APP_REST_SERVER_URL}/api/users/user/${id}/clout`);
    this.setState({ // eslint-disable-line
      allChallenges: data.rows,
      clout,
    });
  }

  randomSlingId = () => {
    slingId = `${randomstring.generate()}`;
  }

  handleDuelClick = () => {
    this.randomSlingId();
    this.props.history.push({
      pathname: `/${slingId}`,
      state: {
        challenge: this.state.selectedChallenge,
      },
    });
  }

  handleAddChallengeClick = () => {
    this.props.history.push('/addChallenge');
  }

  handleChallengeSelect = (e) => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({ selectedChallenge: value });
  }

  render() {
    return (
      <div className="landing-page-container">
        <Logo
          className="landing-page-logo"
        />
        <br />
        <p>Your clout: {this.state.clout}</p>
        <select onChange={e => this.handleChallengeSelect(e)}>
          {this.state.allChallenges.map((challenge, index) => (
            <option
              key={index} // eslint-disable-line
              value={JSON.stringify(challenge)}
            >
              {challenge.title}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button
          backgroundColor="red"
          color="white"
          text="Create Challenge"
          onClick={() => this.handleAddChallengeClick()}
        />
        <br />
        <Button
          backgroundColor="red"
          color="white"
          text="Duel"
          onClick={() => this.handleDuelClick()}
        />
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line
};

export default Home;
