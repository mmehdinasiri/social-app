import React, {Component} from 'react'
import { isAuthentitacted } from '../auth'
import { read } from './apiUser'
import { Redirect , Link } from 'react-router-dom'
import DefaultProfile from '../images/avatar.jpg'
import DeleteUser  from './DeleteUser'
import FollowProfileButton  from './FollowProfileButton'
import ProfileTabs  from './ProfileTabs'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      user: {followers:[] , following:[]},
      redirectToSignin: false,
      following: false
    }
  }
  checkFollow = (user) =>{
    const jwt = isAuthentitacted();
    const match = user.followers.find(follower =>{
      return follower._id === jwt.user._id
    })
    return match 
  }

  clickFollowButton = (callApi)=>{
    const userId = isAuthentitacted().user._id;
    const token = isAuthentitacted().token;
    callApi(userId, token , this.state.user._id)
    .then(data =>{
      if(data.error){
        this.setState({error: data.error})
      }else{
        this.setState({user: data , following: !this.state.following})
      }
    })
  }
  init = (userId) => {
    const token = isAuthentitacted().token;
    read(userId, token)
    .then(data =>{
      if(data.error){
        this.setState({
          redirectToSignin: true
        })
        console.log('error')
      }else{
        let following = this.checkFollow(data)
        this.setState({
          user: data,
          following
        })
      }
    })
  }

  componentDidMount() {
    const userId = this.props.match.params.userId
    this.init(userId);
  }

  componentWillReceiveProps(props) {
    const userId = props.match.params.userId
    this.init(userId);
  }


  render(){
    const { redirectToSignin , user } = this.state;
    const imageProfile = user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}` :  DefaultProfile

    if (redirectToSignin) return <Redirect to="/signin"/>
    return(
      <div className="container">
        <h2 className="my-5">Profile</h2>
        <div className="row">
          <div className="col-md-6">
            {/* <img className="card-img-top" 
                src={DefaultProfile} 
                alt={user.name} 
                style={{width: "100%" , height: '15vh', objectFit: "cover"}}/> */}
            <img style={{height: "200px" , width: "auto"}}  className="img-thumbnail" src={imageProfile} onError={ i => i.target.src = `${DefaultProfile}`} alt={user.name}/>
                 
          </div>

          <div className="col-md-6">
            <div className="lead mt-2">
              <p>Hello {user.name}</p>
              <p>{user.email}</p>
              <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
            </div>
            { isAuthentitacted().user && isAuthentitacted().user._id === user._id ? 
            (<div className="d-inline-block ">
                <Link className="btn btn-raised btn-success mr-5"
                  to={`/user/edit/${user._id}`}
                  >
                    Edit Profile
                  </Link>
                  <DeleteUser userId={user._id}/>
              </div>
            ):(
              <div>
                <FollowProfileButton 
                  following={this.state.following}
                  onButtonClick={this.clickFollowButton}
                />
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <hr/>
            <p className="laed mt-5 mb-5">{user.about}</p>
            <hr/>
            <ProfileTabs followers={user.followers} following={user.following}/>
          </div>
        </div>
    </div>
    )
  }
}



export default Profile;