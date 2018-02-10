import React, { Component } from "react";


class Signin extends Component {
  constructor(props){
    super(props)
    this.state ={
      email:"",
      password: ""
    }
  }

  onEmailChange =(event) => this.setState({email: event.target.value});
  onPasswordChange =(event) => this.setState({password: event.target.value});
  onSubmit = () => {
    fetch("http://localhost:3001/signin",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      })
      .then(response => response.json())
      .then(user => {
        if(user.id){
          this.props.loadUser(user);
          this.props.sign('home');
        }else {
          console.log("no such user found")
        }
      })
  }

  render(){
    const {sign } = this.props;
    return(
        <article className="br4 shadow-5 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l center">
          <main className="pa4 black-80">
              <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                  <legend className="f3 fw6 ph0 mh0">Sign In</legend>
                  <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input
                      className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                      type="email"
                      name="email-address"
                      id="email-address"
                      onChange ={ this.onEmailChange}
                    />
                  </div>
                  <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input
                      className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                      type="password"
                      name="password"
                      id="password"
                      onChange ={ this.onPasswordChange}
                    />
                  </div>
                </fieldset>
                <div className="">
                  <input
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="submit"
                    value="Sign in"
                    onClick ={this.onSubmit}
                  />
                </div>
                <div className="lh-copy mt3">
                  <p className="f6 link dim black db pointer"
                      onClick ={() => sign('Register')}
                    >Register</p>

                </div>
              </div>
        </main>
      </article>
    )
  }

}
export default Signin;
