import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import EditSmurf from './components/EditSmurf';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  componentDidMount() {
    axios.get('http://localhost:3333/smurfs')
      .then(res => this.setState({ smurfs: res.data }))
      .catch(err => console.log("Error", err))
  }

  componentDidUpdate() {
    axios.get('http://localhost:3333/smurfs')
      .then(res => this.setState({ smurfs: res.data }))
      .catch(err => console.log("Error", err))
  }

  deleteSmurf = id => {
    axios.delete(`http://localhost:3333/smurfs/${id}`)
      .then(res => this.setState({ smurfs: res.data }))
      .then(e => this.props.history.push('/'))
      .catch(err => console.log("Error", err))
  }

  render() {
    return (
      <div className="App">
        <NavLink exact activeStyle={{ background: "red" }} to="/">Home</NavLink>
        <NavLink activeStyle={{ background: "red" }} to="/smurf-form">Add a Smurf!</NavLink>

        <Route exact path="/" render={props => <Smurfs smurfs={this.state.smurfs} {...props} deleteSmurf={this.deleteSmurf} />} />
        <Route path="/smurf-form" component={SmurfForm} />
        <Route path="/smurf/:id" render={props => <EditSmurf {...props} smurfs={this.state.smurfs} deleteSmurf={this.deleteSmurf}/>} />
      </div>
    );
  }
}

export default App;
