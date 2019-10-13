import React , { Component} from 'react'
import { singlePost } from './apiPost'
import DefaultPost from '../images/mountain.jpg'
import {Link} from 'react-router-dom'

class SinglePost extends Component {
  state = {
    post: ''
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
          <Link to={`/`}
            className="btn btn-raised btn-primary btn-small">
           back to home 
          </Link>
        </div>
    )
  }
  render(){
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