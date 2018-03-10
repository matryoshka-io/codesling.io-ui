import React, { Component } from 'react';
import Button from '../globals/Button';

export default ({allFriends}) => (
    <div>
    
      
      {allFriends.map( (user, i) => {
          return (
              <p><button className="removeFriend">
                {user.id} {user.username} 
              </button></p>
          )
      })}
      <style>
          {`
            
            .removeFriend {
                background-color: #c24040;
            }
          `}
      </style>
  </div>
)    