import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    var self = this
    fetch("/gdc/account/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "postUserLogin":{
          "login": "someone@somewhere.org",
          "password" :"******"
        }
      })
    }).then(function(response) {
      console.log('response', response)
      response.text().then(function(text) {
        self.setState({
          apiResponse: response,
          responseBody: text
        })
      })
    });
  }

  renderApiResponse() {
    const response = this.state.apiResponse

    if (!response) {
      return <span>Waiting for a response from server</span>
    }
    if (response.status === 403) {
      return <span>
        Status 403 ({this.state.responseBody}): it looks like
        a CORS problem because of the original Origin header
        passed through by the proxy
      </span>
    } else {
      return <span>
        Status {response.status} ({this.state.responseBody}):
        API responded with something else than 403
        - it looks like our request was accepted by the server
        (we would get 403 in case of Origin problems)
      </span>
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          { this.renderApiResponse() }
        </p>
      </div>
    );
  }
}

export default App;
