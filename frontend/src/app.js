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
const routes = [
  { path: '', component: App },
  { path: 'write', component: WriteEditorContainer },
  { path: ':postId', component: PostContainer },
  { path: 'update', component: WriteEditorContainer },
  // { ... }
];

const entry = new Component($entry, routes);

// yarn start 로 App.js 를 build 와 serve 명령을 수행.
/* 
    02.10
    app : 404 페이지 
    postList : 검색기능 오르내림차순 작성자기준 초기화버튼 페이지네이션 갯수선택 캐시갱신
    post : 404 페이지

    ^ 불필요한 이벤트 제거
    ^ 이벤트 위임
    ^ fetch 로딩 실패 ui 처리
    ^ GET 메소드 경우 캐싱, 재요청 X
    ^ POST DELETE PUT 캐싱된 데이터 갱신 
    -- 테스트 코드
*/
