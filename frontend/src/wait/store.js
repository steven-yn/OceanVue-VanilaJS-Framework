const createStore = (initialState, reducer) => {
  let state = initialState;
  const events = {};

  // 상태 변화 시 실행할 함수 등록
  const subscribe = (actionType, eventCallback) => {
    if (!events[actionType]) {
      events[actionType] = [];
    }
    events[actionType].push(eventCallback);
  };

  // 이벤트에 해당하는 함수 모두 실행
  const publish = (actionType) => {
    if (!events[actionType]) {
      return;
    }
    console.log(events);
    console.log(actionType);
    events[actionType].map((cb) => cb());
  };

  // 상태에 이벤트와 필요한 데이터를 보내는 함수
  const dispatch = (action) => {
    // action에는 type(이벤트), payload(데이터)가 있음
    state = reducer(state, action);
    publish(action.type);
  };

  const getState = () => state;

  return {
    getState,
    subscribe,
    dispatch,
  };
};

export default createStore;
