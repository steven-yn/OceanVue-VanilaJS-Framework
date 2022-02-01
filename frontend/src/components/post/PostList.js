/** @jsx h */
import Component from '../../core/Component';

const h = (type, props, ...children) => {
  if (Array.isArray(...children)) {
    const arrConv = Object.values(children[0]);
    children = arrConv;
  }
  /*
    const conv = arrChildren.map((vdom) => ({
      type: vdom.type,
      props: vdom.props,
      children: vdom.children,
    }));
    console.log(conv);
    //return { type, props, children };
  }
  */

  return { type, props, children };
};

const PostListTop = () => {
  return (
    <div id="PostListTop">
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

export const PostItem = ({ postId, title, author, wrDate }) => {
  //console.log(postId);
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

const PostList = (itemList, done) => {
  const posts =
    itemList && done ? (
      itemList.map((item) => PostItem(item))
    ) : (
      <div>로딩중...</div>
    );

  return (
    <div id="PostListBlock" class="common">
      {PostListTop()}
      <div id="PostItemBlock">{posts}</div>
      <div id="ButtonWrap">
        <button>
          <a href="#write">새 글 작성하기</a>
        </button>
      </div>
    </div>
  );
};

export default PostList;
