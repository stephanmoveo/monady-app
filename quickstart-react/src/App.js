import React from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
import VideoJS from "./components/video-js/VideoJS";
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
        <VideoJS />
      </div>
    );
  }
}

export default App;
