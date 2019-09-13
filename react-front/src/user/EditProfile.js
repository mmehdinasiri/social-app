import React , { Component} from 'react'
import { read, update } from './apiUser'
import { isAuthentitacted } from '../auth'
import { Redirect } from 'react-router-dom'

class EditProfile extends Component {
  constructor() {
    super()
    this.state = {
      id: '',
      name: '',
      email: '',
      password: '',
      error: '',
      redirectToProfile: false,
      loading: false
    }
  }
  
  init = (userId) => {
    const token = isAuthentitacted().token;
    read(userId, token)
    .then(data =>{
      if(data.error){
        this.setState({
          redirectToProfile: true
        })
        console.log('error')
      }else{
        this.setState({
          id: data._id,
          name: data.name,
          email: data.email,
          error: ''
        })
      }
    })
  }

  componentDidMount() {
    const userId = this.props.match.params.userId
    this.userData = new FormData();
    this.init(userId);
  }

  handleChange = (name) => (event) => {
    const value = name === "phote" ? event.target.files[0] : event.target.value
    this.userData.set(name, value);
    this.setState( {[name] : event.target.value });
  }
  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const userId = this.props.match.params.userId
    const token = isAuthentitacted().token;
    update(userId, token, this.userData).then(data => {
      console.log(data);
      if(data.error){
        this.setState({error: data.error})
      }else{

        this.setState({
          redirectToProfile: true
        })
      }
    })
    
  }
  signupForm = (name, email, password) => (
        <form>
          <div className="form-group">
            <label className="text-muted">Photo</label>
            <input type="file" accept="image/*" className="form-control" onChange={ this.handleChange("photo") }/>
          </div>

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

          <button className="btn btn-raised btn-primary" onClick={this.clickSubmit}>Update</button>
        </form>
  )
  render(){
    const {id, name, email, password, redirectToProfile, error, loading} = this.state;
    if(redirectToProfile){
      return <Redirect to={`/user/${id}`}/>
    }

    return(
      <div className="container">
        <h2 className="my-5">Edit Profiele</h2>

          <div
            className="alert alert-danger"
            style={{
            display: error
                ? ''
                : 'none'
          }}>{error}</div>

          {loading
            ? <div className="jumbotron text-center">Loadin...</div>
            : ""}

        {this.signupForm(name, email, password)} 
      </div>
    )
  }
}


export default EditProfile;