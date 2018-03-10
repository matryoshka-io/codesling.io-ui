import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import randomstring from 'randomstring';
import axios from 'axios';

import Button from '../globals/Button';
import Logo from '../globals/Logo';
import Nav from '../globals/Nav';
import Users from '../Users';
import Friends from '../Friends';

import './LandingPage.css';


let slingId;

class Home extends Component {
  state = {
    allUsers: [],
    allFriends: [],
    selectedFriend: {},
    selectedUser: [],
    allChallenges: [],
    selectedChallenge: {}
   }

   async componentDidMount() {
    const id = localStorage.getItem('id');
    const { data } = await axios.get(`http://localhost:3396/api/usersChallenges/${id}`);
    const { data: { clout } } = await axios.get(`http://localhost:3396/api/users/user/${id}/clout`);
    const users = await axios.get(`http://localhost:3396/api/users/fetchAllUsers`);
    const friends = await axios.get(`http://localhost:3396/api/friends/fetchAllFriends/${id}`);
    
    if(users){
      this.setState({allUsers: users.data.rows})
    }

    this.setState({
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
        challenge: this.state.selectedChallenge
      }
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
    this.setState({ selectedUser: JSON.parse(value) });
  }

  handleFriendSelect = (e) => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({ selectedFriend: value });
  }
  
  handleShowUsers = () => {
    this.setState({ render: 'users' });
   }

  handleShowFriends = () => {
    this.setState({ render: 'friends' });
  }


  handleAddFriendClick = async (user) => {
    try {
      console.log(localStorage.getItem('id'));
      await axios.post('http://localhost:3396/api/friends/addFriend',
        { user_id: localStorage.getItem('id'), friend_id: user.id }
      );
      
      let friends = this.state.allFriends;
      
      this.setState({
        allFriends: [...this.state.allFriends, user]
      });
      console.log(this.state.allFriends)
    } catch (err) {
      alert('Failed to add friend.');
    }
  }

  render() {
    return (

      <div className="landing-page-container">
        <p> Codesling.io</p>
        <Nav handleShowUsers={this.handleShowUsers} handleShowFriends={this.handleShowFriends}/>
        <p>Your clout: {this.state.clout}</p>
        <select onChange={(e) => this.handleChallengeSelect(e)}>
          {this.state.allChallenges.map(challenge => {
            return (
            <option
              value={JSON.stringify(challenge)}
            >
              {challenge.title}
            </option>)
          }
          )}
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
        {this.state.render === 'users' && <Users allUsers={this.state.allUsers} handleAddFriendClick={this.handleAddFriendClick}/>}
        {this.state.render === 'friends' && <Friends allFriends={this.state.allFriends} />}
      </div>
    );
  }
}

export default Home;
