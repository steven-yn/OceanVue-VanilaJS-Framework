import { createStore } from '../core/Store'; // redux
import reducer from './PostListModule';

const counterStore = createStore(reducer);
counterStore.dispatch(); // reudx에서 초기 데이터를 설정하기 위한 요청

export { counterStore };
