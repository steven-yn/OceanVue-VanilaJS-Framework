import PostList, { Counter } from '../components/post/PostList';
import { postListStore } from '../modules';
import * as PLM from '../modules/PostListModule';
import Component from '../core/Component';

/** @jsx h */
// eslint-disable-next-line no-unused-vars
const h = (type, props, ...children) => {
  return { type, props, children };
};

const compPostList = new Component();

const PostListContainer = (itemList, done) => {
  const $elem = {
    PostListBlock: document.querySelector('#PostListBlock'),
    searchBar: document.querySelector('#searchBar'),
    searchButton: document.querySelector('#searchButton'),
  };

  const dispatch = postListStore.dispatch;
  const state = postListStore.getState();

  const onChangeField = (value) => {
    if (!value) {
      return;
    } else {
      dispatch(PLM.changeField(value));
    }
  };

  const onSetState = () => {
    switch (state) {
      case state.value:
        return {
          state,
        };
      default:
        return state;
    }
  };

  compPostList.oceanEffect(() => {
    const changeEvent = () => {
      $elem.searchBar.onchange = (e) => {
        onChangeField({ value: e.target.value });
      };
    };

    postListStore.subscribe(onSetState);
    changeEvent();
  }, $elem.PostListBlock);

  return (
    <div id="PostListBlock" class="common">
      {PostList(itemList, done)}
    </div>
  );
};

export default PostListContainer;
