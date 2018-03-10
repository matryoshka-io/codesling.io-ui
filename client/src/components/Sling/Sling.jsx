/* globals window, localStorage */

import React, { Component } from 'react';
import CodeMirror from 'react-codemirror2';
// import io from 'socket.io-client/dist/socket.io';
// import axios from 'axios';
import { throttle } from 'lodash';
import PropTypes from 'prop-types';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/base16-dark.css';
import './Sling.css';

import MessagingIndex from '../Messaging/index.jsx'; // eslint-disable-line

import Stdout from './StdOut/index.jsx'; // eslint-disable-line
import EditorHeader from './EditorHeader';
import Button from '../globals/Button';

class Sling extends Component {
  constructor() {
    super();
    this.state = {
      challengerText: null,
      challenge: {},
      stdout: '',
      solvable: true,
      winner: '',
      timeStarted: '', // hm...
      timeTaken: '',
    };
  }

  componentDidMount() {
    const { socket, challenge } = this.props;
    const startChall = typeof challenge === 'string' ? JSON.parse(challenge) : {};
    socket.on('connect', () => {
      socket.emit('client.ready', startChall);
    });

    socket.on('server.initialState', ({ text, challenge }) => { // eslint-disable-line
      this.setState({
        ownerText: text,
        challengerText: text,
        challenge,
        timeStarted: new Date(),
      });
    });

    socket.on('server.changed', ({ text, email }) => {
      if (localStorage.getItem('email') === email) {
        this.setState({ ownerText: text });
      } else {
        this.setState({ challengerText: text });
      }
    });

    socket.on('server.run', ({ stdout, email, solvable, timeStarted }) => { // eslint-disable-line
      const ownerEmail = localStorage.getItem('email');
      email === ownerEmail ? this.setState({ stdout }) : null; // eslint-disable-line
      // console.log(timeStarted);
      if (!solvable) {
        const timeTaken = ((new Date()) - (new Date(timeStarted))) / 1000;
        this.setState({
          solvable,
          timeTaken,
          stdout: `${email} solved the challenge! He took ${timeTaken} seconds.`,
          winner: email,
        });
      }
    });

    window.addEventListener('resize', this.setEditorSize);
  }

  setEditorSize = throttle(() => {
    this.editor.setSize(null, `${window.innerHeight - 80}px`);
  }, 100);

  submitCode = () => {
    if (this.state.solvable) {
      const { socket } = this.props;
      const { ownerText, timeStarted, challenge: { id: challengeId } } = this.state;
      const email = localStorage.getItem('email');
      socket.emit('client.run', { text: ownerText, email, challengeId, timeStarted }); // eslint-disable-line
    } else {
      this.setState({
        stdout: `${this.state.winner} solved the challenge! He took time ${this.state.timeTaken} seconds.
        This challenge has already been solved.`,
      });
    }
  }

  handleChange = throttle((editor, metadata, value) => {
    const email = localStorage.getItem('email');
    this.props.socket.emit('client.update', { text: value, email });
  }, 250)

  initializeEditor = (editor) => {
    this.editor = editor;
    this.setEditorSize();
  }

  render() {
    // const { socket } = this.props;
    return (
      <div className="sling-container">
        <EditorHeader />
        <div className="code1-editor-container">
          <CodeMirror
            editorDidMount={this.initializeEditor}
            value={this.state.ownerText}
            options={{
              mode: 'javascript',
              lineNumbers: true,
              theme: 'base16-dark',
            }}
            onChange={this.handleChange}
          />
        </div>
        <div className="stdout-container">
          <h5>{this.state.challenge.title || this.props.challenge.title}</h5>
          <p>{this.state.challenge.content || this.props.challenge.content}</p>
          <Stdout text={this.state.stdout} />
          <Button
            className="run-btn"
            text="Run Code"
            backgroundColor="red"
            color="white"
            onClick={() => this.submitCode()}
          />
          <MessagingIndex socket={this.props.socket} />
        </div>
        <div className="code2-editor-container">
          <CodeMirror
            editorDidMount={this.initializeEditor}
            value={this.state.challengerText}
            options={{
              mode: 'javascript',
              lineNumbers: true,
              theme: 'base16-dark',
              readOnly: true,
            }}
          />
        </div>
      </div>
    );
  }
}

Sling.propTypes = {
  challenge: PropTypes.string.isRequired, // eslint-disable-line
  socket: PropTypes.object.isRequired, // eslint-disable-line
};

export default Sling;
