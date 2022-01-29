/** @jsx h */
import { createRealNode } from '../../lib/generator';
import { postRouting } from '../../app';

const h = (type, props, ...children) => {
  return { type, props, children };
};

const PostListTop = () => {
  return (
    <div>
      <div id="top">
        <h1>게시판</h1>
        <div class="rightBox">
          <button>새로고침</button>
        </div>
      </div>
      <div id="topMenu">
        <form id="publishDate">
          <select name="publishDate">
            <option value="none">작성일</option>
            <option value="latest">최신글</option>
            <option value="first">작성순서</option>
          </select>
        </form>
        <form id="paginateSelector">
          <select name="paginateSelector">
            <option value="none">게시물 수</option>
            <option value="5th">5개씩 보기</option>
            <option value="10th">10개씩 보기</option>
            <option value="15th">15개씩 보기</option>
            <option value="20th">20개씩 보기</option>
          </select>
        </form>
        <button>설정 초기화</button>
      </div>
    </div>
  );
};

export const getPostList = async ($PostItemBlock) => {
  const res = await fetch(`http://localhost:5000/api/`);
  const body = await res.json();
  const idList = [];

  body.forEach((item) =>
    $PostItemBlock.appendChild(createRealNode(PostItem(item))),
  );

  body.forEach((item) => idList.push(item.postId));

  postRouting(idList);
};

const PostItem = ({ postId, title, author, wrDate }) => {
  return (
    <div>
      <h3>
        <a href={'#' + postId}>{title}</a>
      </h3>
      <div>
        {author}
        {wrDate}
      </div>
    </div>
  );
};

const PostList = () => {
  return (
    <div id="PostListBlock" class="common">
      {PostListTop()}
      <div id="PostItemBlock"></div>
      <div id="ButtonWrap">
        <button>
          <a href="#write">새 글 작성하기</a>
        </button>
      </div>
    </div>
  );
};

export default PostList;
