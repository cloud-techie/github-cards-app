import React from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card key={profile.id} {...profile} />)}
  </div>
);

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div style={{margin: '1rem'}}>
        <img alt="profile" style={{width: '75px'}} src={profile.avatar_url} />
        <div style={{display: 'inline-block', marginLeft: 10, verticalAlign: 'top'}}>
          <div style={{fontSize: '1.25rem', fontWeight: 'bold'}}>{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  
  state = {username: ''};

  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.username}`);
    this.props.onSubmit(resp.data);
    this.setState({ username: '' });
  }

  render() {
    return (
      <div className="mt-3">
        <form onSubmit={this.handleSubmit}>
          <div className="input-group mb-3 col-lg-6">
            <input 
              type="text" 
              className="form-control"
              placeholder="GitHub username" 
              value={this.state.username} 
              onChange={event => this.setState({ username: event.target.value })}
              required
            />
            <div className="input-group-append">
              <button class="input-group-text">Add Card</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

class App extends React.Component {
  
  state = {
    profiles: []
  }

  addNewProfile = (profileData) => {
  	this.setState(prevState => ({
    	profiles: [...prevState.profiles, profileData],
    }));
  };

  render() {
    return (
      <div className="container">
        <h3 className="pb-3 mt-4 mb-2 border-bottom text-center">{this.props.title}</h3>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}

export default App;
