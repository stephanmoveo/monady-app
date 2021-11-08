import React from "react";
import VideoPlayer from "react-video-js-player";
import MOVIE2 from "../../Assets/PetishiOSrec.mov";
import MOVIE1 from "../../Assets/League-app screen.mov";
import "./Video.css";
//75b9b24ff9645307419f67d700113fdf

const VideoJS = () => {

  const [videoUrl, setVideoUrl] = React.useState();

  React.useEffect(() => {
    let query =
      "query { items (ids: [1880404339]) { name, updates{assets{url}} }}";

    fetch("https://api.monday.com/v2", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjEzMjA0MDgyMCwidWlkIjoyNDUzMjYzNywiaWFkIjoiMjAyMS0xMS0wOFQxMDozNTozOC44NjhaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTEwMjMyOCwicmduIjoidXNlMSJ9.f8Vjl4gHGNrCM1XHZV737XuzmDzLEsPCN_svrRHx1Zk",
      },
      body: JSON.stringify({
        query: query,
      }),
    })
      .then((res) => console.log(res.json()))
      .then((res) => console.log(JSON.stringify(res, null, 2)));
  }, []);

  return (
    <div>
      <VideoPlayer src={MOVIE1} playbackRates={[0.5, 2, 3, 4]} />
    </div>
  );
};

export default VideoJS;
