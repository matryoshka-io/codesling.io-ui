import React, { Component } from 'react';
import axios from 'axios';
import Button from '../globals/Button';

export default ({allUsers, handleAddFriendClick}) => (
  <div>
      {allUsers.map( (user, i) => {
          return (
              <p><button className="addFriend" key={i} onClick={ () => handleAddFriendClick(user)}>
                {user.id} {user.username} 
              </button></p>
          )
      })}
      <style>
          {`
            
            .addFriend {
                background-color: #c24040;
            }
          `}
      </style>
  </div>
)    