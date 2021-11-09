import React from "react";
import VideoPlayer from "react-video-js-player";
import "./Video.css";
import mondaySdk from "monday-sdk-js";
const monday = mondaySdk();

const VideoJS = (itemId) => {
  const itemid = parseInt(itemId.itemId);
  const [videoUrl, setVideoUrl] = React.useState("");
  const [updatesNewArr, setupdatesNewArr] = React.useState([]);
  let updatesArr = [];
  let query =
    "query { items (ids: [" + itemid + "]) { name, updates{assets{url}} }}";

  React.useEffect(() => {
    monday
      .api(query)
      .then((res) => {
        console.log(res.data);
        res.data.items[0].updates.forEach((update) => {
          if (update.assets.length > 0) {
            update.assets.forEach((item) => {
              updatesArr.push(item.url);
              console.log(updatesArr);
            });
          }
        });
        setupdatesNewArr(updatesArr);
      })
      .then((res) => console.log(res));
  }, []);

  if (updatesNewArr.length > 0) {
    return (
      <div>
        {updatesNewArr.map((item, index) => {
          console.log(item);
          let tempss = item.split("/").pop().replace("%20", " ");

          return (
            <div key={index}>
              <div className="movie-text"> {tempss}</div>
              <VideoPlayer src={item} playbackRates={[0.5, 1, 2, 3, 4]} />
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default VideoJS;
