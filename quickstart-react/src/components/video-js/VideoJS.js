import React from "react";
import VideoPlayer from "react-video-js-player";
import "./Video.css";
import mondaySdk from "monday-sdk-js";
const monday = mondaySdk();
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};
const VideoJS = (itemId) => {
  const itemid = parseInt(itemId.itemId);
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

  return updatesNewArr.length > 0 ? (
    <div className='video-container'>
      {updatesNewArr.map((item, index) => {
        return (
          <div key={index}>
            <div className="movie-text">
              {item.split("/").pop().replaceAll("%20", " ")}
            </div>
            <VideoPlayer src={item} playbackRates={[0.5, 1, 2, 3, 4]} />
          </div>
        );
      })}
    </div>
  ) : (
    <></>
  );
};

export default VideoJS;
