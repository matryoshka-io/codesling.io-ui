import React, { Component } from 'react';
import axios from 'axios';

import { HistoryList } from './HistoryList.jsx';

class History extends Component {
  state = {
    history: []
  }

  async componentDidMount() {
    const id = localStorage.getItem('id');
    const { data } = await axios.get(`${process.env.REACT_APP_REST_SERVER_URL}/history/fetchAllHistory/${id}`);
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
