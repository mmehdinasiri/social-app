import React, {Component} from 'react'
import { isAuthentitacted } from '../auth'
import { read } from './apiUser'
import { Redirect , Link } from 'react-router-dom'


class Profile extends Component {
  constructor() {
    super()
    this.state = {
      user: "",
      redirectToSignin: false
    }
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
        this.setState({
          user: data
        })
      }
    })
  }
  componentDidMount() {
    const userId = this.props.match.params.userId
    this.init(userId);
  }
  render(){
    const { redirectToSignin , user } = this.state;
    if (redirectToSignin) return <Redirect to="/signin"/>
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2 className="my-5">Profile</h2>
            <p>Hello {isAuthentitacted().user.name}</p>
            <p>{isAuthentitacted().user.email}</p>
            <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
          </div>

          <div className="col-md-6">
            
            { isAuthentitacted().user && isAuthentitacted().user._id == user._id && 
            (<div className="d-inline-block mt-5">
                <Link className="btn btn-raised btn-success mr-5"
                  to={'/user/edit/${user._id}'}
                  >
                    Edit Profile
                  </Link>

                <button className="btn btn-raised btn-danger">
                    Delete Profile
                </button>
              </div>
            )}
          </div>
        </div>
    </div>
    )
  }
}



export default Profile;