/** @jsx h */

// eslint-disable-next-line no-unused-vars
const h = (type, props, ...children) => {
  return { type, props, children };
};

const PostTop = (post) => {
  const { postId, title, author, wrDate } = post;
  return (
    <div>
      <div id="posttop">
        <h1>{title}</h1>
        <div class="rightBox">
          <button>목록</button>
          <button>수정</button>
          <button>삭제</button>
        </div>
      </div>
      <div id="PostHead">
        {`${postId}`} {author} {wrDate}
      </div>
    </div>
  );
};

const Post = (post, done) => {
  return (
    <div id="PostBlock" class="common">
      <div id="PostTop">{post && done ? PostTop(post) : ''}</div>
      <div id="PostContent">{post && done ? post.body : ''}</div>
    </div>
  );
};

export default Post;
