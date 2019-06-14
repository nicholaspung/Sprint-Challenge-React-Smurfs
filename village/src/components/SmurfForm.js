import React, { Component } from 'react';
import axios from 'axios';

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      height: '',
      title: 'Add to the village'
    };
  }

  componentDidMount() {
    if (this.props.smurf) {
      this.setState({
        name: this.props.smurf.name,
        age: this.props.smurf.age,
        height: this.props.smurf.height,
        id: this.props.smurf.id,
        title: "Update smurf"
      })
    }
  }

  addSmurf = event => {
    event.preventDefault();
    // add code to create the smurf using the api
    axios.post('http://localhost:3333/smurfs', {
      name: this.state.name,
      age: this.state.age,
      height: this.state.height
    })
      .then(res => this.setState({
        name: '',
        age: '',
        height: ''
      }))
      .then(e => this.props.history.push("/"))
      .catch(err => console.log("Error", err))
  }

  updateSmurf = event => {
    event.preventDefault();
    // add code to create the smurf using the api
    axios.put(`http://localhost:3333/smurfs/${this.state.id}`, {
      name: this.state.name,
      age: this.state.age,
      height: this.state.height
    })
      .then(e => this.props.history.push("/"))
      .catch(err => console.log("Error", err))
  }

  checkAddOrUpdate = e => {
    if (this.props.smurf) {
      this.updateSmurf(e)
    } else {
      this.addSmurf(e)
    }
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="SmurfForm">
        <form onSubmit={this.checkAddOrUpdate}>
          <input
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.age}
            name="age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.height}
            name="height"
          />
          <button type="submit">{this.state.title}</button>
        </form>
      </div>
    );
  }
}

export default SmurfForm;
