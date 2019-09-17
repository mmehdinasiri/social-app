import React , { Component} from 'react'
import { read, update } from './apiUser'
import { isAuthentitacted, updateUser } from '../auth'
import { Redirect } from 'react-router-dom'
import DefaultProfile from '../images/avatar.jpg'

class EditProfile extends Component {
  constructor() {
    super()
    this.state = {
      id: '',
      name: '',
      email: '',
      about: '',
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
          about: data.about,
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
    const value = name === "photo" ? event.target.files[0] : event.target.value
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
        updateUser(data, ()=>{
          this.setState({
            redirectToProfile: true
          })
        })
      }
    })
    
  }
  signupForm = (name, email, password, about) => (
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
            <label className="text-muted">About</label>
            <input type="textarea" className="form-control" value={about} onChange={ this.handleChange("about") }/>
          </div>

          <div className="form-group">
            <label className="text-muted">Password</label>
            <input type="password" className="form-control" value={password} onChange={ this.handleChange("password") } />
          </div>

          <button className="btn btn-raised btn-primary" onClick={this.clickSubmit}>Update</button>
        </form>
  )
  render(){
    const {id, name, email, about, password, redirectToProfile, error, loading } = this.state;
    if(redirectToProfile){
      return <Redirect to={`/user/${id}`}/>
    }
    const imageProfile = id ? `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}` :  DefaultProfile
    return(
      <div className="container">
        <h2 className="my-5">Edit Profile</h2>

          <div
            className="alert alert-danger"
            style={{
            display: error
                ? ''
                : 'none'
          }}>{error}</div>

          {loading
            ? <div className="jumbotron text-center">Loading...</div>
            : ""}
        <img style={{height: "200px" , width: "auto"}} className="img-thumbnail" src={imageProfile} onError={ i => i.target.src = `${DefaultProfile}`} alt={name}/>
        {this.signupForm(name, email, password, about)} 
      </div>
    )
  }
}


export default EditProfile;