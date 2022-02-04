/** @jsx h */

import Header from './components/common/header';
import PostListContainer from './containers/PostListContainer';
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
      <div id="PostListWrap">{PostListContainer()}</div>
    </div>
  );
};

export default App();

const $entry = document.getElementById('root');
const routes = [
  { path: '', component: App() },
  { path: 'write', component: Write() },
  // { path: ...postId, component: Post(...postId) }
  // { ... }
];

const compEntry = new Component($entry, routes);

// yarn start 로 App.js 를 build 와 serve 명령을 수행.
/* 
    01.30
    ^ Component 인스턴스를 나눠서 사용해서 이벤트 관리와 상태관리 재렌더링 등을 사용할수 있게

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
