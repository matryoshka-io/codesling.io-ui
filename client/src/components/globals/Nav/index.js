import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Logo from '../Logo'
import Button from '../Button'; 

export default ({handleShowUsers}) => (
  
  <div className="navBar">
          {/* <Logo
            className="landing-page-logo"
          /> */}
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
            onClick={() => handleShowUsers}>
          </Button>
    <style> 
      {`

      .navBar {
        height: 80px;
        background-color: #c24040
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

