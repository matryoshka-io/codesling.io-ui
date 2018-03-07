import React, { Component } from 'react';
import CodeMirror from 'react-codemirror2';
import io from 'socket.io-client/dist/socket.io.js';
import axios from 'axios';
import { throttle } from 'lodash';

import Stdout from './StdOut/index.jsx';
import EditorHeader from './EditorHeader';
import Button from '../globals/Button';

import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/base16-dark.css';
import './Sling.css';

class Sling extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      ownerText: null,
      challengerText: 'TESTING',
      text: '',
      challenge: '',
      stdout: '',
      solvable: true,
      winner: '',
      timeStarted: '', // hm...
      timeTaken: '',
    };
  }

  componentDidMount() {
    const { socket, challenge } = this.props;
    // console.log('chall obj', { challenge })
    // console.log('this.props', this.props)
    const startChall = typeof challenge === 'string' ? JSON.parse(challenge) : {}
    // console.log('startChall', startChall)
    socket.on('connect', () => {
      socket.emit('client.ready', startChall);
    });


    socket.on('server.initialState', ({ id, text, challenge }) => {
      this.setState({
        id,
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

    socket.on('server.run', ({ stdout, email, solvable }) => {
      const ownerEmail = localStorage.getItem('email');
      email === ownerEmail ? this.setState({ stdout }) : null;
      if (!solvable) {
        const timeTaken = ((new Date()) - this.state.timeStarted) / 1000;
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

  submitCode = () => {
    if (this.state.solvable) {
      const { socket } = this.props;
      const { ownerText, challenge: { id: challengeId } } = this.state;
      const email = localStorage.getItem('email');
      socket.emit('client.run', { text: ownerText, email, challengeId, });
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

  setEditorSize = throttle(() => {
    this.editor.setSize(null, `${window.innerHeight - 80}px`);
  }, 100);

  initializeEditor = (editor) => {
    this.editor = editor;
    this.setEditorSize();
  }

  render() {
    const { socket } = this.props;
    return (
      < div className="sling-container" >
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
      </div >
    )
  }
}

export default Sling;
