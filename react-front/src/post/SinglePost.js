import React , { Component} from 'react'
import { singlePost, remove } from './apiPost'
import DefaultPost from '../images/mountain.jpg'
import {Link , Redirect} from 'react-router-dom'
import { isAuthentitacted } from '../auth'

class SinglePost extends Component {
  state = {
    post: '',
    redirectToHome: false
  }
  componentDidMount = () => {
    const postId = this.props.match.params.postId;
    singlePost(postId).then(data =>{
      if(data.error){
        console.log(data.error);
      }else{
        this.setState({post: data})
      }
    })
  }
  deletePost = () => {
    const postId = this.props.match.params.postId;
    const token = isAuthentitacted().token;
    remove(postId, token ).then(data =>{
      if(data.error){
        console.log(data.error);
      }else{
        this.setState({redirectToHome: true})
      }
    })
  }
  deleteConfirmed= () =>{
    let answer = window.confirm('Are you sure you want to delete your account?')
    if (answer){
      this.deletePost();
    }
  }

  renderPost = (post) => {
    const postId = post.postedBy ? `/user/${post.postedBy._id}` : '';
    const posterName = post.postedBy ? post.postedBy.name : ' Unknown'
    return (
        <div className="card-body">
          <img src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
          onError={i=> i.target.src=`${DefaultPost}`}
          className="img-thumbnail mb-3"
          style={{height: '200px', width: '100%', objectFit: 'cover'}}
          alt="{post.title}"/>
          <p className="card-text">{post.body}</p>
          <br />
          <p className="font-italic mark">
            Posted by <Link to={`${postId}`}>{posterName}{" "}</Link>
            on {new Date(post.created).toDateString()}
          </p>

          <div className="d-inline-block">
            <Link to={`/`}
              className="btn btn-raised btn-primary btn-small mr-5">
            back to home 
            </Link>
            { isAuthentitacted().user && isAuthentitacted().user._id === post.postedBy._id && 
              <React.Fragment>
                <Link to={`/post/edit/${post._id}`} className="btn btn-raised btn-warning mr-5 btn-small">
                    update post
                </Link>
                <button className="btn btn-raised btn-danger  btn-small" onClick={ this.deleteConfirmed }>
                    delete post
                </button>
              </React.Fragment>
            }
          </div>
     </div>
    )
  }
  render(){
    if(this.state.redirectToHome){
      return <Redirect to={`/`}/>
    }
    const { post } = this.state
     return (
       <div className="container">
         <h2 className="display-2 mt-5 mb-5">{post.title}</h2>
          {!post
          ? <div className="jumbotron text-center">Loadin...</div>
          : this.renderPost(post)
          }
         
       </div>
     )
  }
}


export default SinglePost;