import React, {Component} from 'react'
import {findPeople} from './apiUser'
import DefaultProfile from '../images/avatar.jpg'
import {Link} from 'react-router-dom'
import { isAuthentitacted } from '../auth'

class FindPeople extends Component {
  constructor(){
    super()
    this.state = {
      users: []
    }
  }
  componentDidMount = () => {
    const userId = isAuthentitacted().user._id;
    const token = isAuthentitacted().token;
    findPeople(userId, token).then(data =>{
      if(data.error){
        console.log(data.error)
      }else{
        this.setState({ users: data })
      }
    })
  }

  renderUsers = (users) => (
      <div className="row">
          {users.map((user,i)=>(
            <div className="card col-md-4" key={i}>
              <img 
                 style={{height: "200px" , width: "auto"}}
                 className="img-thumbnail" 
                 src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}`} 
                 onError={ i => i.target.src = `${DefaultProfile}`}
                 alt={user.name}/>
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.email}</p>
                <Link to={`/user/${user._id}`}
                  className="btn btn-raised btn-primary btn-small">
                  View Profile
                </Link>
              </div>
            </div>

          ))}
        </div>
  );
  render(){
    const {users} = this.state
    return (
      <div className="container">
        <h2 className="my-5">Find People</h2>
        {this.renderUsers(users)}
      </div>
    )
  }
}

export default FindPeople;