import React from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import VideoJS from "./components/video-js/VideoJS";
const monday = mondaySdk();

export default function App() {
  const [itemId, setitemId] = React.useState(0);
  React.useEffect(() => {
    monday.get("context").then((res) => setitemId(res.data.itemIds[0]));
  }, []);
  if (itemId !== 0) {
    return (
      <div>
        <VideoJS itemId={itemId} />
      </div>
    );
  } else {
    return <div></div>;
  }
}
