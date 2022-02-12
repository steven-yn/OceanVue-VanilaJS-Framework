/** @jsx h */

import { postListStore } from '../../modules';
import { pageLength } from '../../modules/PostListModule';

// eslint-disable-next-line no-unused-vars
const h = (type, props, ...children) => {
  if (Array.isArray(...children)) {
    const arrConv = Object.values(children[0]);
    children = arrConv;
  }

  return { type, props, children };
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
          <button id="refreshButton">새로고침</button>
        </div>
      </div>
      <div id="PostListTopMenu">
        <select id="datedSelector" name="publishDate">
          <option value="none">작성일</option>
          <option value="latest">최신글 ( 오름차순 )</option>
          <option value="first">작성순서 ( 내림차순 )</option>
        </select>
        <select id="pagenateSelector" name="pagenateSelector">
          <option value="none">게시물 수 ( 기본: 30개 )</option>
          <option value="5th">5개씩 보기</option>
          <option value="10th">10개씩 보기</option>
          <option value="15th">15개씩 보기</option>
          <option value="20th">20개씩 보기</option>
        </select>
        <button id="defaultButton">설정 초기화</button>
        <button>
          <a href="#write">새 글 작성하기</a>
        </button>
      </div>
    </div>
  );
};

const PostItem = (item) => {
  const { postId, title, author, wrDate } = item;

  return (
    <div id="PostItem">
      <h3>
        <a href={'#' + postId}>
          <span>{`${postId}.`}</span>
          <span>{title}</span>
        </a>
      </h3>
      <div>
        <p>
          <span class="authorTag">{author}</span>
          <span>{wrDate}</span>
        </p>
      </div>
    </div>
  );
};

export const PageNum = (state = 1) => {
  return <h4>{`${state}`}</h4>;
};

const PostList = (itemList, done, state) => {
  //console.log(itemList, 'postList 에서 받은 List');
  //console.log(state, 'postList 내의 상태');

  const { value, datedSelector, pagenateSelector, authorFilter, page } = state;
  const pagenateList = [];
  let outputList = [];

  if (itemList) {
    let pages = 1; // 기본값 1
    let itemPerPage = 30;
    const pageItem = itemList.length; // 77
    // 초기 : null, 셀렉트시에 들어옴

    const parsePageSelector = () => {
      switch (pagenateSelector) {
        case '5th':
          return (itemPerPage = 5);
        case '10th':
          return (itemPerPage = 10);
        case '15th':
          return (itemPerPage = 15);
        case '20th':
          return (itemPerPage = 20);
        default:
          return (itemPerPage = 30);
      }
    };

    const parseDatedSelector = () => {
      if (datedSelector === 'none') {
        return itemList;
      } else {
        const result = itemList.concat().sort((postA, postB) => {
          switch (datedSelector) {
            case 'latest':
              if (postA.wrDate > postB.wrDate) {
                return -1;
              }
              if (postA.wrDate < postB.wrDate) {
                return 1;
              }
              return 0;
            case 'first':
              if (postA.wrDate > postB.wrDate) {
                return 1;
              }
              if (postA.wrDate < postB.wrDate) {
                return -1;
              }
              return 0;
            default:
              return 0;
          }
        });
        return result;
      }
    };

    const parseSearchSelector = (list) => {
      const postIdSearch = (target, v) => {
        if (target) {
          return target.includes(v);
        } else {
          return false;
        }
      };
      const titleSearch = (target, v) => {
        if (target) {
          return target.includes(v);
        } else {
          return false;
        }
      };
      const bodySearch = (target, v) => {
        if (target) {
          return target.includes(v);
        } else {
          return false;
        }
      };

      const result = list.filter((post) => {
        const postId = JSON.stringify(post.postId);
        const { title, body } = post;

        return (
          postIdSearch(postId, value) ||
          titleSearch(title, value) ||
          bodySearch(body, value)
        );
      });
      return result;
    };

    const parseAuthorSelector = (list) => {
      const authorSearch = (target, v) => {
        if (target) {
          return target.includes(v);
        } else {
          return false;
        }
      };

      const result = list.filter((post) => {
        const author = post.author;

        return authorSearch(author, authorFilter);
      });
      return result;
    };

    parsePageSelector();

    outputList = parseDatedSelector();

    if (value) {
      outputList = parseSearchSelector(outputList);
    }
    if (authorFilter) {
      outputList = parseAuthorSelector(outputList);
    }

    pages = Math.ceil(pageItem / itemPerPage);
    for (let i = 0; i < pages; i++) {
      pagenateList.push(
        outputList.slice(i * itemPerPage, (i + 1) * itemPerPage),
      );
    }
  }

  // 정렬 과정중에 비어있게 된 배열들을 제거해줌.
  const validList = pagenateList.filter((list) => {
    if (list.length === 0) {
      return false;
    } else {
      return true;
    }
  });

  // store 에 페이지 length 를 기록.
  postListStore.dispatch(pageLength({ number: validList.length })); // 기본값 : [30, 30, 17], 3

  // 2차원 배열상( 상태로 관리되는 가상 페이지네이션 배열 ) 에서 페이지 에 뿌려줄 item을 지정
  // [[array(30)] [array(30)] [array(17)]] page = 1 이면 [0] 의 배열을 map 으로 엘리먼트를 생성한다 !
  //console.log(validList, 'validList 배열');
  if (validList.length === 0) {
    done = false;
  }
  //console.log(outputList, 'validList 배열');
  if (outputList.length === 0) {
    done = false;
  }

  const getPage = (list) => {
    //console.log(list, 'getPage 내의 배열');
    //console.log(page, 'page 값');

    let outPage = page;

    if (!outPage) {
      outPage = 1;
    }

    return list[outPage - 1].map((item) => PostItem(item));
  };

  const posts = outputList && done ? getPage(validList) : <div>로딩중...</div>;

  return (
    <div>
      {PostListTop()}

      <div id="pagenation">
        <div id="PostItemBlock">{posts}</div>
      </div>
      <div id="pageBtnWrap">
        <button id="prevPage">이전 페이지</button>
        <div id="nowPage">{PageNum(page)}</div>
        <button id="nextPage">다음 페이지</button>
      </div>
    </div>
  );
};

export default PostList;

/*
else {
      const pagenation = () => {
        switch (pagenateSelector) {
          case '5th':
            return;
          //post.slice(0, 5);
          case '10th':
            return;
          //post.slice(0, 10);
          case '15th':
            return;
          //post.slice(0, 15);
          case '20th':
            return;
          //post.slice(0, 20);
          default:
            return;
          //post;
        }
      };
      return pagenation();
*/
