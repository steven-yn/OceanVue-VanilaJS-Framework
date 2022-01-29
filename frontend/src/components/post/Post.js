/** @jsx h */
import Header from '../common/header';

// eslint-disable-next-line no-unused-vars
const h = (type, props, ...children) => {
  return { type, props, children };
};

const PostTop = () => {
  return (
    <div>
      <div id="top">
        <h1>title</h1>
        <div class="rightBox">
          <button>목록</button>
          <button>수정</button>
          <button>삭제</button>
        </div>
      </div>
      <div id="PostHead">PostId, author, publishDate</div>
    </div>
  );
};

const Post = () => {
  return (
    <div id="Wrap">
      {Header()}
      <div class="spacer"></div>
      <div id="PostBlock" class="common">
        {PostTop()}
        <div id="PostContent">content</div>
      </div>
    </div>
  );
};

export default Post;
