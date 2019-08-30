import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import {signin , authentication} from '../auth'

class Signin extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            error: '',
            referToRedirect: false,
            isLoading: false
        }
    }
    handleChange = (name) => (event) => {
        this.setState({error: ''})
        this.setState({[name]: event.target.value});
    }

    clickSubmit = (event) => {
        event.preventDefault();
        this.setState({isLoading: true})
        const {email, password} = this.state
        const user = {
            email,
            password
        }
        
       signin(user)
            .then(data => {
                if (data.error) {
                    this.setState({error: data.error, isLoading: false})
                } else {
                    authentication(data, () => {
                        this.setState({referToRedirect: true})
                    })
                }
            })

    }

 
    signinForm = (email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={this.handleChange("email")}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={this.handleChange("password")}/>
            </div>

            <button className="btn btn-raised btn-primary" onClick={this.clickSubmit}>Submit</button>
        </form>
    )
    render() {
        const {email, password, error, referToRedirect, isLoading} = this.state;
        if (referToRedirect) {
            return <Redirect to='/'/>
        }
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signin</h2>
                <div
                    className="alert alert-danger"
                    style={{
                    display: error
                        ? ''
                        : 'none'
                }}>
                    {error}
                </div>
                {isLoading
                    ? <div className="jumbotron text-center">Loadin...</div>
                    : ""}
                {this.signinForm(email, password)}
            </div>
        )
    }
}
export default Signin;
