/** @jsx h */

import Header from './components/common/header';
import PostList from './components/post/PostList';
import Component from './core/Component';
import { Write } from './components/write/write';

// eslint-disable-next-line no-unused-vars
const h = (type, props, ...children) => {
  return { type, props, children };
};

const App = () => {
  return (
    <div id="wrap">
      {Header()}
      <div class="spacer"></div>
      <div id="PostListWrap">{PostList()}</div>
    </div>
  );
};
//
export default App();

const $entry = document.getElementById('root');
const routes = [
  { path: '', component: App() },
  { path: 'write', component: Write() },
  // { path: ...postId, component: Post(...postId) }
  // { ... }
];

const compEntry = new Component($entry, routes);

const router = () => {
  const hashPath = window.location.hash.replace('#', '');
  const uiComponent =
    routes.find((route) => route.path === hashPath).component || '';

  compEntry.render(uiComponent);
  if (hashPath === '') {
    compEntry.getPostId();
  }
};

// 주소 변경시 router가 실행됨.
window.addEventListener('hashchange', router);
// 새로고침을 하면 DOMContentLoaded 이벤트가 발생하고
// render 함수는 url의 hash를 취득해 새로고침 직전에 렌더링되었던 페이지를 다시 렌더링한다.
window.addEventListener('DOMContentLoaded', router);

// yarn start 로 App.js 를 build 와 serve 명령을 수행.
/* 
    01.30
    ^ 'state' 개념을 도입해서 상태 변경시 그부분만 렌더링 다시하도록
    ^ fetch 받아오기전 로딩 상태를 정의하고, 로딩 상태 렌더링과
      로딩 끝난후의 렌더링을 만들어보기
    ^ 가상돔 렌더링 과정을 정리하고 core 형태로 만들기

    ^ 이벤트 관리 최적화
    ^ Redux 의 구조와 키워드를 그대로사용하고 store, subscribe, Observer Pattern 내가 만들어보기
    
    이후 해야할것 (순서대로)

    ^XHR 관련 구현 : write, post
    --API 캐싱
    --테스트 코드
*/
