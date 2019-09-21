import React, {Component} from 'react'
import {follow, unfollow} from './apiUser'

class FollowProfileButton extends Component {
  followClick =()=>{
    this.props.onButtonClick(follow)
  }
  unfollowClick =()=>{
    this.props.onButtonClick(unfollow)
  }
  render(){
    return(
      <div className="d-inline-block ">
        <h1>{this.props.following}</h1>
        {
           !this.props.following ? 
            (<button onClick={this.followClick} className="btn btn-success btn-raised mr-5">Follow</button>)
            :
            (<button onClick={this.unfollowClick} className="btn btn-warning btn-raised">unFollow</button>)
        }
      </div>
    )
  }
}

export default FollowProfileButton;