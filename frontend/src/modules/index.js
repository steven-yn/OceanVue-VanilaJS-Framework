import { createStore } from '../core/Store';
import counterModule from './PostListModule';
import postModule from './PostModule';
import editorModule from './writeModule';
/*
const rootReducer = {
  editorModule,
  counterModule,
};
*/
export const counterStore = createStore(counterModule);
counterStore.dispatch(); // redux에서 초기 데이터를 설정하기 위한 요청

export const editorStore = createStore(editorModule);

export const postStore = createStore(postModule);
