import React , { Component} from 'react'
import { singlePost, update } from './apiPost'
import { isAuthentitacted } from '../auth'
import { Redirect } from 'react-router-dom'
import DefaultProfile from '../images/mountain.jpg'

class SinglePost extends Component {
  state = {
    id: '',
    title: '',
    body: '',
    redirectToProfile: false,
    error: '',
    filesize: 0,
    loading: false
  }
  init = (postId) => {
    singlePost(postId)
    .then(data =>{
      if(data.error){
        this.setState({
          redirectToProfile: true
        })
        console.log('error')
      }else{
        this.setState({
          id: data._id,
          title: data.title,
          body: data.body,
          error: ''
        })
      }
    })
  }

  componentDidMount() {
    const postId = this.props.match.params.postId
    this.postData = new FormData();
    this.init(postId);
  }

  handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value
    const filesize = name === "photo" ? event.target.files[0].size : event.target.value
    this.postData.set(name, value);
    this.setState( {[name] : event.target.value, filesize });
  }
  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const postId = this.state.id
    const token = isAuthentitacted().token;
    update(postId, token, this.postData).then(data => {
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

  editPostForm = (title, body ) => (
        <form>
          <div className="form-group">
            <label className="text-muted">Post Photo</label>
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

          <button className="btn btn-raised btn-primary" onClick={this.clickSubmit}>Update post</button>
        </form>
   )
  render(){
    const { id, title, body, redirectToProfile, error, loading } = this.state

    
    if(redirectToProfile){
      return <Redirect to={`/user/${isAuthentitacted().user._id}`}/>
    }
     return (
       <div className="container">
         <h2 className=" mt-5 mb-5">{title}</h2>

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
        <img style={{height: "200px" , width: "auto"}} 
          className="img-thumbnail" 
          src={`${process.env.REACT_APP_API_URL}/post/photo/${id}?${new Date().getTime()}`}
          onError={ i => i.target.src = `${DefaultProfile}`} alt={title}/>
          {this.editPostForm(title, body)}
       </div>
     )
  }
}


export default SinglePost;