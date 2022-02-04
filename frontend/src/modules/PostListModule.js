// dispatch에서 사용될 type들을 정의해준다.
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

// reducer에서 사용될 action을 정의해준다.
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

// 초기 state의 값을 정의해준다.
const initialState = {
  diff: 1,
  number: 0,
};

// reducer를 정의하여 store에 넘겨준다.
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        number: state.number + state.diff,
      };
    case DECREASE:
      return {
        ...state,
        number: state.number - state.diff,
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
