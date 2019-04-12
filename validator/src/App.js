import React, { Component } from 'react';
import './App.css';
import Jimp from 'jimp';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      url : "",
      status: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.checkImage = this.checkImage.bind(this);
    this.clearTapped = this.clearTapped.bind(this);

  }

  checkImage(url){
    if(url.match(/\.(jpeg|jpg|png)$/)){
      Jimp.read(url)
      .then(image => {
        // Do stuff with the image.
        
          if(image.bitmap.height > 500 || image.bitmap.width > 500){
            if(!image.hasAlpha()){
              this.setState({
                status: "Good to go 👍"
              })
            } else {
              this.setState({
                status: "👎Whoops! Use a different image. This has transparent parts. 👎"
              })
            }
          } else {
            this.setState({
              status: "👎 Whoops! Use a different image. This is not large enough. 👎"
            })
          }
  
      })
      .catch(err => {
        // Handle an exception.
      });
    } else {
      this.setState({
        status: "Whoops! This link is not image. Try a different link. 👎"
      })
    }
  }

  clearTapped(){
    this.setState({
      url: "",
      status: ""
    })
  }

  handleChange(e) {
    let change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
    if(e.target.value == ""){
      this.setState({
        status: ""
      })
    }
    this.checkImage(e.target.value)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <input value={this.state.url} placeholder="enter image link here" className="linkInput" onChange={this.handleChange} name="url"/>
          <button className="clearButton" onClick={this.clearTapped}>clear</button>
          <p>{this.state.status}</p>
        </header>
      </div>
    );
  }
}

export default App;
