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
    allChallenges: [],
    selectedChallenge: {}
   }

  //  this.handleShowUsers = this.handleShowUsers.bind(this)

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
  
  // handleUserSelect = (e) => {
  //   e.preventDefault();
  //   const { value } = e.target;
  //   this.setState({ selectedUser: JSON.parse(value) });
  // }

  // handleFriendSelect = (e) => {
  //   e.preventDefault();
  //   const { value } = e.target;
  //   this.setState({ selectedFriend: value });
  // }
  handleShowUsers = () => {
    this.setState({ render: 'users' });
   }

  handleShowFriends = () => {
    this.setState({ render: 'friends' });
  }


  handleAddFriendClick = async () => {
    console.log('friend added')
    try {
      await axios.post('http://localhost:3396/api/friends/addFriend',
        { user_id: localStorage.getItem('id'), friend_id: this.state.selectedUser.id }
      );
      
      let friends = this.state.allFriends;
      friends.push(this.state.selectedUser);
      
      this.setState({
        allFriends: friends
      });
    } catch (err) {
      alert('Failed to add friend.');
    }
  }

  render() {
    return (

      <div className="landing-page-container">
        <p> Codesling.io</p>
        <Nav handleShowUsers={this.handleShowUsers} handleShowFriends={this.handleShowFriends}/>
         
        {/* <div className="navBar">
          <Logo
            className="landing-page-logo"
          />
          <Button 
            className="navButton"
            backgroundColor="red"
            color="white"
            text="Users">
          </Button>
          <Button 
            className="navButton"
            backgroundColor="red"
            color="white"
            text="Friends"
            onClick={() => this.handleShowFriends}>
          </Button>
        </div> */}
        {/* <p>users: </p>
        {console.log(this.state.allUsers)}
        <select>
          {this.state.allUsers.map(user => {
            console.log(user)
            // return (
            //   <option>{user.username}</option>
            // )
          })}
        </select>
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
        <br /> */}
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
        {/* <Router>
          <Switch>
            <Route path="/home/users" component={Users}/>
          </Switch>
        </Router> */}
        {this.state.render === 'users' && <Users allUsers={this.state.allUsers} handleAddFriendClick={this.handleAddFriendClick}/>}
        {this.state.render === 'friends' && <Friends allFriends={this.state.allFriends} />}
      </div>
    );
  }
}

export default Home;
