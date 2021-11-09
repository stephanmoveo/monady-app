import React from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
import VideoJS from "./components/video-js/VideoJS";
const monday = mondaySdk();
// class App extends React.Component {
//   constructor(props) {
//     super(props);

//     // Default state
//     this.state = {
//       settings: {},
//       name: "",
//       context: {},
//       events: {},
//       taskColorLabel: "",
//       workingIndex: -1,
//       users: [],
//       bugs: [],
//       loading: false,
//       itemId: 0,
//     };
//   }

//   componentDidMount() {
//     monday.listen("context", (res) => {
//       this.setState({ context: res.data });

//       monday.api(
//           `query ($boardIds: [Int]) { boards (ids:$boardIds) { name items(limit:1) { name id } } }`,
//           { variables: { boardIds: this.state.context.boardIds } }
//         )
//         .then((res) => {
//           this.setState({ itemId: res.data.boards[0].items[0].id });
//         });
//     });
//   }

//   render() {
//     if (this.state.itemId != 0) {
//       return (
//         <div className="App">
//           <VideoJS itemId={this.state.itemId} />
//         </div>
//       );
//     } else {

//       return <div></div>;
//     }
//   }
// }

// export default App;

// import React from 'react'

export default function App() {
  const [mainState, setmainState] = React.useState({
    settings: {},
    name: "",
    context: {},
    events: {},
    taskColorLabel: "",
    workingIndex: -1,
    users: [],
    bugs: [],
    loading: false,
    itemId: 0,
  });

  React.useEffect(() => {
    monday.listen("context", (res) => {
      setmainState({ context: res.data });
      monday
        .api(
          `query ($boardIds: [Int]) { boards (ids:$boardIds) { name items(limit:20) { name id } } }`,
          { variables: { boardIds: mainState.context.boardIds } }
        )
        .then((res) => {
          console.log(res.data);
          setmainState({ itemId: res.data.boards[6].items[0].id });
        });
    });
  }, []);
  // if (mainState.itemId != 0) {
    return (
      <div>
        <VideoJS itemId={mainState} />
      </div>
    );
  // } else {
  //   return <div></div>;
  // }
}
