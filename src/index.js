import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import service from './facade/service';

const  participant = {
  first: "Robert",
  last: "Vu"
}

const  participantChange = {
  last: "Zhang"
}

const db = service.operation();

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: null
    }
    this.testFunc = this.testFunc.bind(this);
  }
  
  testFunc() {
    // db.addPermanent(participant);
    // db.getPermanent("Ch0mMkjDoORt8kEmOjeT", (doc) => this.setState({test: JSON.stringify(doc)}));
    // db.updatePermanent("Ch0mMkjDoORt8kEmOjeT", participantChange);
    // db.deletePermanent("Ch0mMkjDoORt8kEmOjeT");
    // db.undoDeletePermanent("Ch0mMkjDoORt8kEmOjeT");
    // db.approvePending("tVdCcIeZhJkYdX4GQYe0")
    let list = []
    db.getAllDocuments((doc) => {
      list.push(doc);
      this.setState({
        test: list.map(i => {
          return <li>{JSON.stringify(i)}</li>
        })
      });
    });
  }
  
  render() {
    return (
      <div>
        <button onClick={this.testFunc}>Click Me</button>
        <ul>{this.state.test}</ul>
      </div>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    {/* <Test /> */}
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
