import { memo, useRef, useState } from "react";
import api from "../../../utils/api";
import { useSelector } from "react-redux";
import SideDashBoardPost from "./SideDashboardPost";
import beatifyDate from "../../../utils/beautifyDate";

const SideDashboardComponent = () => {
  const { posts, connected } = useSelector(
    (state) => state.user.connectedSM.instagram
  );
  const [openPostInsight, setOpenPostInsight] = useState(false);

  const postInsights = useRef({});

  const handleOnPostClick = async (e, postId, mediaType) => {
    postInsights.current = { ...posts.find((post) => post.id === postId) };
    postInsights.current.timestamp = beatifyDate(
      postInsights.current.timestamp
    );

    mediaType === "VIDEO"
      ? await api
          .getReelsInsight(postId)
          .then((data) => {
            postInsights.current = { ...postInsights.current, ...data };
            setOpenPostInsight(true);
            return data;
          })
          .catch((error) => console.error(error))
      : await api
          .getPostInsight(postId)
          .then((data) => {
            postInsights.current = { ...postInsights.current, ...data };
            setOpenPostInsight(true);
            return data;
          })
          .catch((error) => console.error(error));
  };

  const handleCloseButton = (e) => {
    e.preventDefault();
    postInsights.current = {};
    setOpenPostInsight(false);
  };

  return (
    <div className="dashboard__side">
      <h2
        className={`dashboard__side__header ${openPostInsight ? "hidden" : ""}`}
      >
        Your feed
      </h2>
      <div className="post-feed">
        <ul className={` ${openPostInsight ? "hidden" : ""} post-feed__list `}>
          {connected
            ? posts.map((post) => {
                return (
                  <SideDashBoardPost
                    key={post.id}
                    post={post}
                    handleOnPostClick={(e) =>
                      handleOnPostClick(e, post.id, post.media_type)
                    }
                    openPostInsight
                  />
                );
              })
            : ""}
        </ul>

        <div
          className={
            !openPostInsight ? "hidden" : "dashboard__side__detailed-post"
          }
        >
          <div style={{ position: "relative", margin: "auto 0 0" }}>
            <button
              onClick={(e) => handleCloseButton(e)}
              type="button"
              className="detailed-post__close-button"
            />
            {postInsights.current.media_type === "VIDEO" ? (
              <video
                className="post__video"
                style={{
                  width: "90%",
                  height: "100%",
                  margin: "0",
                  display: "block",
                }}
                preload="none"
                autoPlay
                loop={true}
              >
                <source
                  src={postInsights.current.media_url}
                  alt="some"
                  type="video/mp4"
                />
              </video>
            ) : (
              <img
                className="detailed-post__image"
                src={postInsights.current.media_url}
                alt="loadded from instagram feed"
              />
            )}
          </div>
          <ul className="detailed-post__statistic">
            <li className="detailed-post__statistic__item">
              <p className="detailed-post__statistic__text">Date: </p>
              <p className="detailed-post__statistic__text">
                {postInsights.current.timestamp}
              </p>
            </li>
            <li className="detailed-post__statistic__item">
              <p className="detailed-post__statistic__text">Likes: </p>
              <p className="detailed-post__statistic__text">
                {postInsights.current.like_count}
              </p>
            </li>
            <li className="detailed-post__statistic__item">
              <p className="detailed-post__statistic__text">Impressions: </p>
              <p className="detailed-post__statistic__text">
                {postInsights.current.impressions}
              </p>
            </li>
            <li className="detailed-post__statistic__item">
              <p className="detailed-post__statistic__text">
                Account Reached:{" "}
              </p>
              <p className="detailed-post__statistic__text">
                {postInsights.current.reach}
              </p>
            </li>
            <li className="detailed-post__statistic__item">
              <p className="detailed-post__statistic__text">Post Saved: </p>
              <p className="detailed-post__statistic__text">
                {postInsights.current.saved}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default memo(SideDashboardComponent);
