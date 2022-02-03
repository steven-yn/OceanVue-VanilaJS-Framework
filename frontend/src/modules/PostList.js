import { createStore } from './core/Store.js';

// dispatch에서 사용될 type들을 정의해준다.
export const START_LOADING = 'loading/START_LOADING';
export const FINISH_LOADING = 'loading/FINISH_LOADING';

// reducer에서 사용될 action을 정의해준다.
export const startLoading = (requestType) => ({
  type: START_LOADING,
  requestType,
});

export const finishLoading = (requestType) => ({
  type: FINISH_LOADING,
  requestType,
});

// 초기 state의 값을 정의해준다.
const initialState = {};

// reducer를 정의하여 store에 넘겨준다.
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, [action.payload]: true };
    case 'FINISH_LOADING':
      return { ...state, [action.payload]: false };
    default:
      return state;
  }
}

export const loading = createStore(reducer);

/*
divToggle.onclick = () => {
  loading.dispatch(startLoading(LIST_POSTS));
};
*/
