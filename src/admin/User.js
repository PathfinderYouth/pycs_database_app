import React, { Component } from 'react';

class User extends Component {

  styles = {
    fontSize: 24,
    fontWeight: "bold",
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <span style={this.styles}> {this.props.user} </span>
          <button onClick={() => this.props.onDelete(this.props.user.id)}>
            Delete
          </button>
        </div>
      </React.Fragment>
    );
  }
}
 
export default User;