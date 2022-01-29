/** @jsx h */
import render from './lib/generator';
import Header from './components/common/header';
import PostList from './components/post/PostList';
import Post from './components/post/Post';
import { waitCreate, Write } from './components/write/write';
import { getPostList } from './components/post/PostList';
import items from './components/Items';

// 1. 가상돔 정의. 객체 형태
// react 의 React.createElement 묘사
const h = (type, props, ...children) => {
  // let children = args.length ? [].concat(...args) : null;

  return { type, props, children };
};

// yarn start 로 app.js 를 build 와 serve 명령을 수행.
/* 
    01.27
    ^ 상태기반 렌더링 마무리 짓기.
    ^가상돔 렌더링 과정을 정리하고 커스터마이징.
    --가상돔 렌더링 최적화 ( 필요부분만 렌더링 로직 ) 작성.
    ^컴포넌트 기반 설계 참고하여 적용. 상태관리 라이브러리 커스텀
    ^Observer Pattern

    이후 해야할것 (순서대로)

    ^XHR 관련 구현 
    ^서버 연동
    --API 캐싱
    
    --이벤트 관리 최적화
    --테스트 코드
*/

// JSX 가 적용된 객체들

const app = () => {
  return (
    <div id="wrap">
      {Header()}
      <div class="spacer"></div>
      {PostList()}
      <div id="test"></div>
    </div>
  );
};

const routes = {
  // hash: url path

  '': app(),
  ':postId': Post(),
  write: Write(),
};

const router = () => {
  // url의 hash를 취득
  const path = window.location.hash.replace('#', '');
  const select = routes[path];
  const $root = document.getElementById('root');

  // 페이지 전환, 새로고침시 root 하위 요소가 있으면 모든 노드를 제거.
  if ($root.firstElementChild) {
    $root.removeChild($root.firstElementChild);
  }

  // router 가 실행되면 component 를 렌더링.
  render(select);

  const $test = document.querySelector('#test');
  items($test);

  // write 의 경우 quill 라이브러리를 실제엘리먼트가 생성된후 호출
  if (path === 'write') {
    console.log('rendering quill !');
    waitCreate.next();
  }

  if (path === '') {
    getPostList();
  }
};

// 주소 변경시 router가 실행됨.
window.addEventListener('hashchange', router);

// 새로고침을 하면 DOMContentLoaded 이벤트가 발생하고
// render 함수는 url의 hash를 취득해 새로고침 직전에 렌더링되었던 페이지를 다시 렌더링한다.
window.addEventListener('DOMContentLoaded', router);

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
