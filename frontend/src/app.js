import Header from './components/common/header';
import PostListContainer from './containers/PostListContainer';
import WriteEditorContainer from './containers/WriteEditorContainer';
import PostContainer from './containers/PostContainer';
import Component from './core/Component';

/** @jsx h */
// eslint-disable-next-line no-unused-vars
const h = (type, props, ...children) => {
  return { type, props, children };
};

const App = () => {
  return (
    <div id="wrap">
      {Header()}
      <div class="spacer"></div>
      <div id="PostListWrap">{PostListContainer()}</div>
    </div>
  );
};

export default App();

const $entry = document.getElementById('root');

// 스택 형태로 routes 를 생성
const routes = [
  { path: '', component: App },
  { path: 'write', component: WriteEditorContainer },
  { path: ':postId', component: PostContainer },
  { path: 'update', component: WriteEditorContainer },
];

const compEntry = new Component($entry, routes);

// yarn start 로 App.js 를 build 와 serve 명령을 수행.
/* 
    02.10 <- 한것 : core 문제점 수정 post 페이지에 렌더링, post페이지에서 수정 삭제 목록 기능구현
                    글 작성하기 에서 수정가능하도록 기능구현 수정후 자동이동 구현 
                    postList 에서 검색, 작성일, 게시물수 필터링

    02.11 <- 사실상 기능구현끝. 게시판 각종 필터링 완료, 수정시 자동이동 버그 잡힘

    ^ app : 404 페이지 
    ^ post : 404 페이지
    ^ fetch 로딩 실패 ui 처리

    ^ store 수정
    ^ 불필요한 이벤트 제거
    ^ 이벤트 위임

    -- 테스트 코드
*/
