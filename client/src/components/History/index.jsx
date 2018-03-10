import React, { Component } from 'react';
import axios from 'axios';

import { HistoryList } from './HistoryList.jsx';

const { REACT_REST_SERVER_URL } = process.env;

class History extends Component {
  state = {
    history: []
  }

  async componentDidMount() {
    const id = localStorage.getItem('id');
    const { data } = await axios.get(`${REACT_REST_SERVER_URL}/api/history/fetchAllHistory/${id}`);
    this.setState({ history: data });
  }

  render() {
    return (
      <div>
        <HistoryList history={this.state.history}/>
      </div>
    );
  }
}

export default History;
