import { createStore } from '../core/Store';
import postListModule from './PostListModule';
import postModule from './PostModule';
import editorModule from './writeModule';
/*
const rootReducer = {
  editorModule,
  counterModule,
};
*/
export const postListStore = createStore(postListModule);

export const editorStore = createStore(editorModule);

export const postStore = createStore(postModule);
