import React, { Component } from 'react';

class Signup extends Component {
  constructor(){
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      error: ''
    }
  }
  handleChange = (name) => (event) => {
    this.setState( {[name] : event.target.value });
  }
  clickSubmit = (event) => {
    event.preventDefault();
    const {name, email, password} = this.state
    const user ={
      name,
      email,
      password
    }
    fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        'Accept': "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(response => {
      return response.json();
    })
    .catch(err =>{
       console.log(err)
     });
  }
  render() {
    const {name, email, password} = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Signup</h2>

        <form>
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input type="text" className="form-control" value={name} onChange={ this.handleChange("name") }/>
          </div>

          <div className="form-group">
            <label className="text-muted">Email</label>
            <input type="email" className="form-control" value={email} onChange={ this.handleChange("email") } />
          </div>

          <div className="form-group">
            <label className="text-muted">Password</label>
            <input type="password" className="form-control" value={password} onChange={ this.handleChange("password") } />
          </div>

          <button className="btn btn-raised btn-primary" onClick={this.clickSubmit}>Submit</button>
        </form>
      </div>
    )
  }
 } 
export default Signup;


