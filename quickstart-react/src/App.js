import React from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import VideoJS from "./components/video-js/VideoJS";
const monday = mondaySdk();
monday.setToken("eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjEzMjA0MDgyMCwidWlkIjoyNDUzMjYzNywiaWFkIjoiMjAyMS0xMS0wOFQxMDozNTozOC44NjhaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTEwMjMyOCwicmduIjoidXNlMSJ9.f8Vjl4gHGNrCM1XHZV737XuzmDzLEsPCN_svrRHx1Zk")

export default function App() {
  const [itemId, setitemId] = React.useState(0);

  React.useEffect(() => {
    monday
      .get("context")
      .then((res) => {
        console.log(res);
//.data.itemIds === undefined ? 0 : res.data.itemIds[0]
        setitemId(res);
        console.log(itemId)
      })
      .catch((res) => console.log(res));
  }, []);
  React.useEffect(() => {
    console.log(itemId);  
  }, [itemId]);
  if (itemId !== 0) {
    console.log(itemId);
    return (
      <div>
        <VideoJS itemId={itemId.data.itemId} />
      </div>
    );
  } else {
    return <div>heloooo</div>;
  }
}
