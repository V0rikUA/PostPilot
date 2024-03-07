const instagramVideo = (post, handleOnPostClick) => {
  if (!post.media_url) {
    return (
      <>
        <div
          onClick={(e) => handleOnPostClick(e, post.id)}
          style={{ zIndex: +2 }}
        >
          <h2 className="post__video_unavaliable">
            Sorry this video is unavaliable due to copyrigt issues!
          </h2>
          <p>
            You can check this post by this link <br />
            <a
              className=""
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {"This link ☺️"}
            </a>
          </p>
        </div>
      </>
    );
  }
  return (
    <video
      className="post__video"
      style={{ width: "90%", height: "100%", margin: "0", zIndex: -1 }}
      autoPlay
      muted
      loop={true}
    >
      <source src={post.media_url} alt="some" type="video/mp4" />
    </video>
  );
};

const SideDashBoardPost = ({ post, handleOnPostClick }) => {
  return (
    <>
      <li className="post__item">
        <div
          className="post__media-container"
          onClick={(e) => handleOnPostClick(e, post.id)}
          style={{}}
        >
          {post.media_type === "IMAGE" ||
          post.media_type === "CAROUSEL_ALBUM" ? (
            <img
              className="post__image"
              src={post.media_url}
              alt="some"
              style={{ height: "100%" }}
            />
          ) : (
            instagramVideo(post, handleOnPostClick)
          )}
        </div>
      </li>
    </>
  );
};

export default SideDashBoardPost;
