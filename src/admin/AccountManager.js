import React, { Component } from 'react';
import service from '../facade/service';
import User from './User';

class AccountManager extends Component {
  constructor(props) {
    super(props);
    this.accountService = service.getUserList;
    this.handleUserRetrieval = this.handleUserRetrieval.bind(this);
    this.state = {};
  }

  handleUserRetrieval() {
    const users = this.accountService.getAllList(null, null, null, null);
    alert(users);
  }

  render() {
    return (
      <button onClick={this.handleUserRetrieval}>Click me</button>
    );
  }
}

export default AccountManager;
