import React from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import VideoJS from "./components/video-js/VideoJS";
import VideoJS2 from "./components/video-js/VideoJS2";
const monday = mondaySdk();
monday.setToken(
  "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjEzMjA0MDgyMCwidWlkIjoyNDUzMjYzNywiaWFkIjoiMjAyMS0xMS0wOFQxMDozNTozOC44NjhaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTEwMjMyOCwicmduIjoidXNlMSJ9.f8Vjl4gHGNrCM1XHZV737XuzmDzLEsPCN_svrRHx1Zk"
);

export default function App() {
  const [contextData, setcontextData] = React.useState(0);
  React.useEffect(() => {
    monday
      .get("context")
      .then((res) => {
        setcontextData(res);
      })
      .catch((res) => console.log(res));
  }, []);

  if (contextData !== 0) {
    return (
      <div>
        <VideoJS
          //  itemId={contextData.data.itemId}
          //  userId={contextData.data.user.id}
          contextData={contextData}
        />
      </div>
    );
  } else {
    return <div>heloooo</div>;
  }
}
