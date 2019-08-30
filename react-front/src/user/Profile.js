import React, {Component} from 'react'
import { isAuthentitacted } from '../auth'


class Profile extends Component {
  constructor() {
    super()
    this.state = {
      user: "",
      redirectToSignin: false
    }
  }

  componentDidMount() {
    const userId =  this.props.match.params.userId
    fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`,{
      method : "GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${isAuthentitacted().token}`
      }
    })
    .then(response => {
      return response.json()
    })
    .then(data =>{
      if(data.error){
        console.log('error')
      }else{
        this.setState({
          user: data
        })
      }
    })
  }
  render(){
    return(
      <div className="container">
        <h2>Profile</h2>
        <p>Hello {isAuthentitacted().user.name}</p>
        <p>{isAuthentitacted().user.email}</p>
        <p>{`Joined ${new Date(this.state.user.created).toDateString()}`}</p>
      </div>
    )
  }
}



export default Profile;