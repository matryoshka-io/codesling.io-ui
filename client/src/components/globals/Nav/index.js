import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

import Logo from '../Logo'
import Button from '../Button'; 

export default ({handleShowUsers, handleShowFriends}) => (
  
  <div className="navBar">
          
          <Button 
            className="navButton"
            backgroundColor="red"
            color="white"
            text="Users"
            onClick={() => handleShowUsers()}>
          </Button>
          <Button 
            className="navButton"
            backgroundColor="red"
            color="white"
            text="Friends"
            onClick={() => handleShowFriends()}>
          </Button>
    <style> 
      {`

      .navBar {
        height: 80px;
        background-color: #c24040
      }
      .navButton {
        margin: 10px;
      }
      
      `}
    </style> 
  </div>

)

//   componentDidMount() {
//     this.fetchAllChallenges();
//   }

//   fetchAllChallenges = async () => {
//     const id = localStorage.getItem('id');
//     const { data } = await axios.get(`http://localhost:3396/api/usersChallenges/${id}`)
//     this.setState({ challenges: data.rows });
//   }

//   render() {
//     return (
//       <div>
//         {this.state.challenges.map(challenge => {
//           return (
//             <div>
//               <li>content: {challenge.content} </li>
//               <li>difficulty: {challenge.difficulty} </li>
//             </div>
//           )
//         })}
//       </div>
//     );
//   }
// }

// export default Nav;

