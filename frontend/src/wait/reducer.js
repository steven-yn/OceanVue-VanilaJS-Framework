const reduce = () => {
  window.addEventListener('load', () => {
    const divToggle = document.querySelector('.toggle');
    const counter = document.querySelector('h1');
    const btnIncrease = document.querySelector('#increase');
    const btnDecrease = document.querySelector('#decrease');

    const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
    const INCREASE = 'INCREASE';
    const DECREASE = 'DECREASE';

    const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
    const increase = (difference) => ({ type: INCREASE, difference });
    const decrease = () => ({ type: DECREASE });

    const initialState = {
      toggle: false,
      counter: 0,
    };

    // state 가 undefined 일 땐 initialState 를 기본값으로 사용
    function reducer(state = initialState, action) {
      //action.type 에 따라 다른 작업을 처리함
      switch (action.type) {
        case TOGGLE_SWITCH:
          return {
            ...state, // 불변성 유지
            toggle: !state.toggle,
          };
        case INCREASE:
          return {
            ...state,
            counter: state.counter + action.difference,
          };
        case DECREASE:
          return {
            ...state,
            counter: state.counter - 1,
          };
        default:
          return state;
      }
    }

    const store = createStore(reducer);

    const stateRender = () => {
      const state = store.getState(); // 현재 상태를 불러옴.

      // 토글 처리
      if (state.toggle) {
        divToggle.classList.add('active');
      } else {
        divToggle.classList.remove('active');
      }
      // 카운터 처리
      counter.innerText = state.counter;
    };

    stateRender();
    store.subscribe(stateRender);

    const eventListening = () => {
      divToggle.onclick = () => {
        console.log('Toggle!');
        store.dispatch(toggleSwitch());
      };

      btnIncrease.onclick = () => {
        console.log('increase!');
        store.dispatch(increase(1));
      };

      btnDecrease.onclick = () => {
        store.dispatch(decrease());
      };
    };

    eventListening();
  });
};
/*
divToggle.addEventListener(
  'click',
  () => {
    store.dispatch(toggleSwitch());
  },
  false,
);

btnIncrease.addEventListener(
  'click',
  () => {
    store.dispatch(increase(1));
  },
  false,
);

btnDecrease.addEventListener(
  'click',
  () => {
    store.dispatch(decrease());
  },
  false,
);
*/

/*
// 선택자
const divToggle = document.querySelector('.toggle');
const counter = document.querySelector('h1');
const btnIncrease = document.querySelector('#id');
const btnDecrease = document.querySelector('#decrease');

// 액션 타입과 정의
const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

// 액션 생성 함수
const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = (difference) => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });

const initialState = {
  toggle: false,
  counter: 0,
};

// 리듀서 함수 정의
// state 가 undefined 일 땐 initialState 를 기본값으로 사용
function reducer(state = initialState, action) {
  //action.type 에 따라 다른 작업을 처리함
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state, // 불변성 유지
        toggle: !state.toggle,
      };
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.difference,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

const render = () => {
  const state = store.getState(); // 현재 상태를 불러옴.
  // 토글 처리
  if (state.toggle) {
    divToggle.classList.add("active");
  } else {
    divToggle.classList.remove("active");
  }
  // 카운터 처리
  counter.innerText = state.counter;
};

render();
store.subscribe(render);

divToggle.onclick = () => {
  store.dispatch(toggleSwitch());
};

btnIncrease.onclick = () => {
  store.dispatch(increase(1));
};

btnDecrease.onclick = () => {
  store.dispatch(decrease());
};
*/
