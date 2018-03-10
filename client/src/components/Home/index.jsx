import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import randomstring from 'randomstring';
import axios from 'axios';
import PropTypes from 'prop-types';

import Button from '../globals/Button';
import Nav from '../globals/Nav';
import Users from '../Users';
import Friends from '../Friends';

import './LandingPage.css';

const { REACT_APP_REST_SERVER_URL } = process.env;

let slingId;

class Home extends Component {
  state = {
    allUsers: [],
    allFriends: [],
    allChallenges: [],
    selectedChallenge: {},
  };

  async componentDidMount() {
    const id = localStorage.getItem('id');
    const { data } = await axios.get(`${REACT_APP_REST_SERVER_URL}/api/usersChallenges/${id}`);
    const { data: { clout } } = await axios.get(`${REACT_APP_REST_SERVER_URL}/api/users/user/${id}/clout`);
    const users = await axios.get(`${REACT_APP_REST_SERVER_URL}/api/users/fetchAllUsers`);
    const friends = await axios.get(`${REACT_APP_REST_SERVER_URL}/api/friends/fetchAllFriends/${id}`);

    if (users) {
      this.setState({ allUsers: users.data.rows }); // eslint-disable-line
    }

    this.setState({ // eslint-disable-line
      allFriends: friends.data,
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

  handleUserSelect = (e) => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({ selectedUser: JSON.parse(value) }); // eslint-disable-line
  }

  handleFriendSelect = (e) => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({ selectedFriend: value }); // eslint-disable-line
  }

  handleShowUsers = () => {
    this.setState({ render: 'users' });
  }

  handleShowFriends = () => {
    this.setState({ render: 'friends' });
  }


  handleAddFriendClick = async (user) => {
    try {
      await axios.post(
        'http://localhost:3396/api/friends/addFriend',
        { user_id: localStorage.getItem('id'), friend_id: user.id },
      );
      this.setState({
        allFriends: [...this.state.allFriends, user],
      });
    } catch (err) {
      // alert('Failed to add friend.');
    }
  }

  render() {
    return (
      <div className="landing-page-container">
        <p> Codesling.io</p>
        <Nav handleShowUsers={this.handleShowUsers} handleShowFriends={this.handleShowFriends} />
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
        {this.state.render === 'users' && <Users allUsers={this.state.allUsers} handleAddFriendClick={this.handleAddFriendClick} />}
        {this.state.render === 'friends' && <Friends allFriends={this.state.allFriends} />}
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line
};

export default Home;
