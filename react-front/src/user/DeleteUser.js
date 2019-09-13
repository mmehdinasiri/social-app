import React , { Component } from 'react'
import { isAuthentitacted } from '../auth'
import { remove } from './apiUser'
import { signout } from '../auth'
import { Redirect } from 'react-router-dom'

class DeleteUser extends Component {
  state = {
    redirect : false
  }
   deleteAccount = () =>{
     const token = isAuthentitacted().token;
     const userId = this.props.userId
     remove(userId, token).then(data => {
       if(data.error){
         console.log(data.error)
       }else{
         signout(()=>{
           this.setState({
             redirect : true
           })
           console.log('User is deleted')
         })
       }
     })
  }
  
  deleteConfirmed= () =>{
    let answer = window.confirm('Are you sure you want to delete your account?')
    if (answer){
      this.deleteAccount();
    }
  }
  render (){
    if(this.state.redirect){
      return <Redirect to='/'/>
      
    }
    return (
      <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger">
          Delete Profile
      </button>
    )
  }
}


export default DeleteUser;