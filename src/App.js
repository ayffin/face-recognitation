import React, { Component } from 'react';
import './App.css';
import "tachyons";
import Clarifai from 'clarifai';
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import Form from "./components/form/Form";
import Signin from "./components/Signin/Signin";
import Rank from "./components/RANK/Rank";
import Register from "./components/Register/Register";
import ImageRec from "./components/ImageRec/ImageRec";
import Particles from 'react-particles-js';

const app = new Clarifai.App({
 apiKey: 'f6df1f3d07fe4baca78600c3de7bde53'
});

const particle = {
particles: {
  number: {
    value: 30,
    density: {
      enable: true,
      value_area:200
    }
  }
}}

class App extends Component {
    constructor(){
      super()
      this.state = {
        input: "",
        ImageUrl: "",
        Box: [],
        route: "Signin",
        isSignedIn: false,
        user: {
          id: "",
          name: "",
          email: "",
          entries: 0,
          create_at: ""
        }
      }
    }

    loadUser = (data) => {
      console.log(data)
      this.setState({user:{
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        create_at: data.create_at
      }})
    }
    calculationBox = (data) => {
        const image = document.getElementById('image');
        const width = image.width;
        const height = image.height;
        const bounding_box =data.outputs[0].data.regions
        console.log("bounding_box",bounding_box)
        return bounding_box.map(input => {
          return {
            top: input.region_info.bounding_box.top_row *height,
            left: input.region_info.bounding_box.left_col * width,
            bottom: height - (input.region_info.bounding_box.bottom_row*height),
            right: width - (input.region_info.bounding_box.right_col* width)
          }
        })
      }

    faceDetectionfun = (box) => this.setState({Box: box});

    onInputChange = (event) => {
      this.setState({input: event.target.value});}

    onButtonSubmit = () => {
      this.setState({ImageUrl: this.state.input});
      app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
        .then(response => {
          if(response){
              fetch("http://localhost:3001/Image",{
                  method: "PUT",
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                    id: this.state.user.id
                  })
                })
                .then(response => response.json())
                .then(count => {
                    this.setState(Object.assign(this.state.user, {entries: count }))
                  })
                }
          this.faceDetectionfun(this.calculationBox(response));

        })
          .catch(err => console.log(err));
    }

    onRouteChange = (route) => {
      if(route === "signout"){
        this.setState({isSignedIn: false})
      }else if (route === "home") {
        this.setState({isSignedIn: true})
      }
      this.setState({route:route})
    }

    render() {
      return (
        <div className="App">
            <Particles
              className="particles"
                params={ particle}
              />
            <Navigation
              sign ={this.onRouteChange}
              isSignedIn = {this.state.isSignedIn}
            />
            <Logo/>
            {
              this.state.route === "home"
                ? <div>
                    <Rank
                      name ={this.state.user.name}
                      entries ={this.state.user.entries}
                        />
                    <Form
                      onInputChanges={this.onInputChange}
                      onSubmit = { this.onButtonSubmit}
                    />
                    <ImageRec
                      imageUrl = {this.state.ImageUrl}
                      box = {this.state.Box}
                    />
                  </div>
                :(
                  this.state.route === "Signin"
                    ? <Signin
                      sign ={this.onRouteChange}
                      loadUser ={this.loadUser}
                    />
                    : <Register sign ={this.onRouteChange} loadUser ={this.loadUser}/>
                )

            }

        </div>
      );
    }
}

export default App;
