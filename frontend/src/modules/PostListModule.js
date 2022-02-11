// dispatch에서 사용될 type들을 정의해준다.
const READ_POSTLIST = 'postList/READ_POSTLIST';
const CHANGE_FIELD = 'postList/CHANGE_FIELD'; // 특정 key 값 바꾸기
const DATED_SELECT = 'postList/DATED_SELECT';
const PAGENATE_SECLET = 'postList/PAGENATE_SECLET';
const AUTHOR_FILTER = 'postList/AUTHOR_FILTER';
const REFRESH_STORE = 'postList/REFRESH_STORE';
const PAGE_INCREASE = 'postList/PAGE_INCREASE';
const PAGE_DECREASE = 'postList/PAGE_DECREASE';
const PAGE_LENGTH = 'postList/PAGE_LENGTH';

// reducer에서 사용될 action을 정의해준다.
export const readPostList = (postList) => ({
  type: READ_POSTLIST,
  payload: postList,
});

export const changeField = ({ value }) => ({
  type: CHANGE_FIELD,
  value,
});

export const authorSelect = ({ value }) => ({
  type: AUTHOR_FILTER,
  value,
});

export const datedSelect = ({ selector }) => ({
  type: DATED_SELECT,
  selector,
});

export const pagenationSelect = ({ selector }) => ({
  type: PAGENATE_SECLET,
  selector,
});

export const refreshStore = (postList) => ({
  type: REFRESH_STORE,
  payload: postList,
});

export const pageIncrease = () => ({ type: PAGE_INCREASE });
export const pageDecrease = () => ({ type: PAGE_DECREASE });
export const pageLength = ({ number }) => ({
  type: PAGE_LENGTH,
  number,
});

// 초기 state의 값을 정의해준다.
const initialState = {
  value: null,
  postList: null,
  datedSelector: 'none',
  pagenateSelector: 'none',
  authorFilter: null,
  page: 1,
  diff: 1,
  pageLength: 3,
};

// reducer를 정의하여 store에 넘겨준다.
export default function postListModule(state = initialState, action = {}) {
  switch (action.type) {
    case READ_POSTLIST:
      return {
        ...state,
        postList: action.payload,
      };
    case CHANGE_FIELD:
      return {
        ...state,
        value: action.value,
      };
    case AUTHOR_FILTER:
      return {
        ...state,
        authorFilter: action.value,
      };
    case DATED_SELECT:
      return {
        ...state,
        datedSelector: action.selector,
      };
    case PAGENATE_SECLET:
      return {
        ...state,
        pagenateSelector: action.selector,
      };
    case REFRESH_STORE:
      return {
        ...initialState,
        postList: action.payload,
      };
    case PAGE_INCREASE:
      return {
        ...state,
        page: state.page + state.diff,
      };
    case PAGE_DECREASE:
      return {
        ...state,
        page: state.page - state.diff,
      };
    case PAGE_LENGTH:
      return {
        ...state,
        pageLength: action.number,
      };

    default:
      return state;
  }
}

//import { createStore } from '../core/redux';
//export const store = createStore(reducer);

//store.observable(render);

/*
divToggle.onclick = () => {
  loading.dispatch(startLoading(LIST_POSTS));
};
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
