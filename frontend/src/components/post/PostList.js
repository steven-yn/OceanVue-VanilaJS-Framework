/** @jsx h */
// eslint-disable-next-line no-unused-vars
const h = (type, props, ...children) => {
  if (Array.isArray(...children)) {
    const arrConv = Object.values(children[0]);
    children = arrConv;
  }

  return { type, props, children };
};

export const Counter = (state = 0) => {
  return <h4>{`${state}`}</h4>;
};

const PostListTop = () => {
  return (
    <div id="PostListTop">
      <div id="top">
        <h1>게시판</h1>
        <div id="searchBlock">
          <input
            id="searchBar"
            type="search"
            name="postsearch"
            placeholder="검색할 내용을 입력해주세요,,,"
          />
          <button id="searchButton">검색</button>
        </div>
        <div class="rightBox">
          <button>새로고침</button>
        </div>
      </div>
      <div id="PostListTopMenu">
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

export const PostItem = (item) => {
  const { postId, title, author, wrDate } = item;
  return (
    <div id="PostItem">
      <h3>
        <a href={'#' + postId}>
          <span>{`${postId}.`}</span>
          {title}
        </a>
      </h3>
      <div>
        <p>
          {author}
          <span>{wrDate}</span>
        </p>
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
    <div>
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
