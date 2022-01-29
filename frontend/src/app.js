/** @jsx h */

import Header from './components/common/header';
import PostList from './components/post/PostList';
import Component from './core/Component';
import { Write } from './components/write/write';

// eslint-disable-next-line no-unused-vars
const h = (type, props, ...children) => {
  // let children = args.length ? [].concat(...args) : null;

  return { type, props, children };
};

const App = () => {
  return (
    <div id="wrap">
      {Header()}
      <div class="spacer"></div>
      {PostList()}
      <div id="test"></div>
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

const router = () => {
  const hashPath = window.location.hash.replace('#', '');
  const uiComponent =
    routes.find((route) => route.path === hashPath).component || '';

  compEntry.render(uiComponent);
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
    ^ DIFF 알고리즘 적용하여 기존노드를 제거하지 않도록하기.
    
    ^ 일단은 Redux 로 상태관리 라이브러리 만들기.
    ^ fetch 받아오기전 로딩 상태를 정의하고, 로딩 상태 렌더링과
      로딩 끝난후의 렌더링을 만들어보기
    ^ 가상돔 렌더링 과정을 정리하고 core 형태로 만들기

    -- 이벤트 관리 최적화
    -- Redux 의 구조와 키워드를 그대로사용하고 store, subscribe, Observer Pattern 내가 만들어보기
    
    이후 해야할것 (순서대로)

    ^XHR 관련 구현 : write 남았음
    --API 캐싱
    --테스트 코드
*/

// JSX 가 적용된 객체들

/*
const routes = [
  { path: '', component: App() },
  { path: 'write', component: Write() },
];

export const postRouting = (idList) => {
  const postRoute = idList.map((id) => ({
    path: `${id}`,
    component: Post(id),
  }));

  postRoute.forEach((route) => routes.push(route));
};

// hash: url path

const router = () => {
  // url의 hash를 취득
  const hashPath = window.location.hash.replace('#', '');
  const component =
    routes.find((route) => route.path === hashPath).component || '';
  const $root = document.getElementById('root');

  // 페이지 전환, 새로고침시 root 하위 요소가 있으면 모든 노드를 제거.
  if ($root.firstElementChild) {
    $root.removeChild($root.firstElementChild);
  }

  // router 가 실행되면 component 를 렌더링.
  render(component);

  //const $test = document.querySelector('#test');
  //items($test);

  // write 의 경우 quill 라이브러리를 실제엘리먼트가 생성된후 호출
  if (hashPath === 'write') {
    console.log('rendering quill !');
    waitCreate.next();
  }

  if (hashPath === '') {
    const $PostItemBlock = document.getElementById('PostItemBlock');
    
  }
};

// 주소 변경시 router가 실행됨.
window.addEventListener('hashchange', router);

// 새로고침을 하면 DOMContentLoaded 이벤트가 발생하고
// render 함수는 url의 hash를 취득해 새로고침 직전에 렌더링되었던 페이지를 다시 렌더링한다.
window.addEventListener('DOMContentLoaded', router);
*/

/*
const INCREASE = 'INCREASE';

const increase = (difference) => ({ type: INCREASE, difference });

const initialState = {
  toggle: false,
  counter: 0,
};

const store = createStore(reducer);

function reducer(state = initialState, action) {
  //action.type 에 따라 다른 작업을 처리함
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.difference,
      };

    default:
      return state;
  }
}

function onclickDispatch() {
  console.log('dispatch!');
  store.dispatch(increase(1));
}

const stateRender = () => {
  const counter = document.querySelector('h1');
  console.log(counter);
  const state = store.getState(); // 현재 상태를 불러옴.
  // 카운터 처리
  counter.innerText = state.counter;
};

stateRender();
store.subscribe(stateRender);

*/
