import React from "react";
import "./Video.css";
import VideoJS2 from "./VideoJS2";
import mondaySdk from "monday-sdk-js";
const monday = mondaySdk();
monday.setToken(
  "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjEzMjA0MDgyMCwidWlkIjoyNDUzMjYzNywiaWFkIjoiMjAyMS0xMS0wOFQxMDozNTozOC44NjhaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTEwMjMyOCwicmduIjoidXNlMSJ9.f8Vjl4gHGNrCM1XHZV737XuzmDzLEsPCN_svrRHx1Zk"
);
String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, "g"), replacement);
};
const VideoJS = ({ contextData }) => {
  const [userName, setUserName] = React.useState("");
  let temp = contextData.data.user.id
  React.useEffect(() => {
    monday
      .api("query { users(ids: ["+temp+"]) { name }}")
      .then((res) => {
        setUserName(res.data.users[0].name);
        console.log(res);
      })
      .catch((res) => console.log(res));
  }, []);

  const itemid = contextData.data.itemId;
  const [updatesNewArr, setupdatesNewArr] = React.useState([]);
  let updatesArr = [];
  let query =
    "query { items (ids: [" + itemid + "]) { name, updates{assets{url}} }}";

  React.useEffect(() => {
    monday
      .api(query)
      .then((res) => {
        res.data.items[0].updates.forEach((update) => {
          if (update.assets.length > 0) {
            update.assets.forEach((item) => {
              updatesArr.push(item.url);
            });
          }
        });
        setupdatesNewArr(updatesArr);
      })
      .catch((res) => console.log(res));
  }, []);

  const playerRef = React.useRef(null);
  const handlePlayerReady = (player) => {
    playerRef.current = player;
  };

  return updatesNewArr.length > 0 && userName !== "" ? (
    <div className="video-container">
      {updatesNewArr.map((item, index) => {
        return (
          <div key={index}>
            <div className="movie-text">
              {item.split("/").pop().replaceAll("%20", " ")}
            </div>
            <VideoJS2
              userName={userName}
              src={item}
              index={index}
              onReady={handlePlayerReady}
              itemid={itemid}
            />
          </div>
        );
      })}
    </div>
  ) : (
    <></>
  );
};

export default VideoJS;
