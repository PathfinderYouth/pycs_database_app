import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import FirebaseFacade from './firebaseFacade'

const  participant = {
  first: "Robert",
  last: "Vu"
}

const db = FirebaseFacade.getInstance();

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: null
    }
  }
  
  testFunc() {
    db.addPending(participant);
    db.getPendingList();
  }
  
  render() {
    return (
      <div>
        <button onClick={this.testFunc}>Click Me</button>
        <div>{this.state.test}</div>
      </div>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Test />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
