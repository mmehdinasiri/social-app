import React , { Component} from 'react'
import { create } from './apiPost'
import { isAuthentitacted, updateUser } from '../auth'
import { Redirect } from 'react-router-dom'
import DefaultProfile from '../images/avatar.jpg'

class NewPost extends Component {
  constructor() {
    super()
    this.state = {
      title: '' ,
      body: '',
      photo: '',
      error: '',
      user: {},
      filesize: 0,
      loading: false,
      redirectToProfile: false
    }
  }
  
  componentDidMount() {
    this.postData = new FormData();
    this.setState({user: isAuthentitacted().user})
  }

  handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value
    const filesize = name === "photo" ? event.target.files[0].size : event.target.value
    this.postData.set(name, value);
    this.setState( {[name] : event.target.value, filesize });
    console.log(this.state);
  }
  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const userId = isAuthentitacted().user._id
    const token = isAuthentitacted().token;
    create(userId, token, this.postData).then(data => {
      if(data.error){
        this.setState({error: data.error})
      }else {
        this.setState({
          loading: false,
          title: '' ,
          body: '',
          photo: '',
          redirectToProfile: true
        })
      }
    })
    
  }
  newPostForm = (title, body ) => (
        <form>
          <div className="form-group">
            <label className="text-muted">Photo</label>
            <input type="file" accept="image/*" className="form-control" onChange={ this.handleChange("photo") }/>
          </div>

          <div className="form-group">
            <label className="text-muted">title</label>
            <input type="text" className="form-control" value={title} onChange={ this.handleChange("title") }/>
          </div>

          <div className="form-group">
            <label className="text-muted">Body</label>
            <input type="textarea" className="form-control" value={body} onChange={ this.handleChange("body") }/>
          </div>

          <button className="btn btn-raised btn-primary" onClick={this.clickSubmit}>Create a post</button>
        </form>
  )
  render(){
    const {title, body, photo, user, loading , error, redirectToProfile} = this.state;
    if(redirectToProfile){
      return <Redirect to={`/user/${user._id}`}/>
    }
    return(
      <div className="container">
        <h2 className="my-5">Create a new post</h2>

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
        {this.newPostForm(title, body )} 
      </div>
    )
  }
}


export default NewPost;