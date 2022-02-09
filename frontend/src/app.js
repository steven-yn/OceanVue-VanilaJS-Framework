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
  // { ... }
];

const entry = new Component($entry, routes);

// yarn start 로 App.js 를 build 와 serve 명령을 수행.
/* 
    02.05
    ^ 가상돔 렌더링 과정을 정리하고 core 형태로 만들기

    ^ 이벤트 관리 최적화
    ^ Redux 의 구조와 키워드를 그대로사용하고 store, subscribe, Observer Pattern 내가 만들어보기
    
    이후 해야할것 (순서대로)

    ^XHR 관련 구현 : write, post
    --API 캐싱
    --테스트 코드
*/
