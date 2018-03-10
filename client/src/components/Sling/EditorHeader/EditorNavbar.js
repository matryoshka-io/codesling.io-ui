import React from 'react';
import Button from '../../globals/Button/index.js';

const EditorNavbar = () => (
  <nav className="editor-navbar">
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
    <Button
      backgroundColor="red"
      color="white"
      text="Logout"
    />
  </nav>
);

export default EditorNavbar;
