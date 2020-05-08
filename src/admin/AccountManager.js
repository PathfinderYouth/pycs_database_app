import React, { Component, useEffect } from 'react';
import service from '../facade/service';
import User from './User';

class AccountManager extends Component {
  constructor(props) {
    super(props);
    this.accountService = service.getUserList();
    this.handleUserRetrieval = this.handleUserRetrieval.bind(this);
    this.handleUserDelete = this.handleUserDelete.bind(this);
    this.state = {};
  }

  render() {
    return <></>;
  }
}

export default AccountManager;
