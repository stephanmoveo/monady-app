import React from "react";
import VideoPlayer from "react-video-js-player";
import MOVIE2 from "../../Assets/PetishiOSrec.mov";
import MOVIE1 from "../../Assets/League-app screen.mov";
import "./Video.css";
//75b9b24ff9645307419f67d700113fdf
//`query ($boardIds: [Int]) { boards (ids:$boardIds) { name items(limit:1) { name id } } }`,

const VideoJS = (itemId) => {

  const itemid = parseInt(itemId.itemId.itemId);
  const [videoUrl, setVideoUrl] = React.useState();
  console.log(itemid);
  let query = `query  ($itemid: Int) { items (ids: [$itemid]) { name, updates{assets{url}} }}`;
  React.useEffect(() => {
    console.log(itemid);
    if (itemid != 0) {
    signUpSecond()}
  }, [itemid]);

  const signUpSecond = async () => {
    try {
      const res = await fetch("https://api.monday.com/v2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjEzMjA0MDgyMCwidWlkIjoyNDUzMjYzNywiaWFkIjoiMjAyMS0xMS0wOFQxMDozNTozOC44NjhaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTEwMjMyOCwicmduIjoidXNlMSJ9.f8Vjl4gHGNrCM1XHZV737XuzmDzLEsPCN_svrRHx1Zk",
        },
        body: JSON.stringify({ query: query }),
      });
      const data = await res.json();
      console.log(data);
      // setVideoUrl(data.data.items[0].updates[0].assets[0].url)
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(videoUrl);

  return (
    <div>
      <VideoPlayer src={MOVIE2} playbackRates={[0.5, 2, 3, 4]} />
    </div>
  );
};

export default VideoJS;
