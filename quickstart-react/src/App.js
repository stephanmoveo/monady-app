import React from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
import MOVIE1 from "./Assets/League-app screen.mov";
import MOVIE2 from "./Assets/PetishiOSrec.mov";
import AttentionBox from "monday-ui-react-core/dist/AttentionBox.js";

const monday = mondaySdk();

class App extends React.Component {
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      settings: {},
      name: "",
    };
  }

  componentDidMount() {
    // TODO: set up event listeners
    monday.listen("settings", (res) => {
      this.setState({ settings: res.data });
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        {/* <AttentionBox
        title="Hello Monday Apps!"
        text="Let's start building your amazing app, which will change the world!"
        type="success"
      /> */}
        <div className='video-container'>
          <video className="video-warp" controls>
            <source className="vid-source" src={MOVIE2}></source>
          </video>
        </div>
      </div>
    );
  }
}

export default App;
