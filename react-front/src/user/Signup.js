import React, { Component } from 'react';
import  { signup } from '../auth';

class Signup extends Component {
  constructor(){
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      error: '',
      open: false
    }
  }
  handleChange = (name) => (event) => {
    this.setState({
      error: '',
      open: false
    })
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
    signup(user).then(data => {
      if(data.error){
        this.setState({error: data.error})
      }else{

        this.setState({
          error: '',
          name: '',
          email: '',
          password: '',
          open: true
        })
      }
    })
    
  }
  
 
  signupForm = (name, email, password) => (
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
  ) 
  render() {
    const {name, email, password, error, open} = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Signup</h2>
        <div className="alert alert-danger" style={{display : error ? '' : 'none'}}>
          {error}
        </div>
        <div className="alert alert-info" style={{display : open ? '' : 'none'}}>
          welcome to social app please login 
        </div>
          {this.signupForm(name, email, password)} 
      </div>
    )
  }
 } 
export default Signup;


