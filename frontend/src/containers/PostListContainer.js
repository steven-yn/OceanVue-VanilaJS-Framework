import PostList, { Counter } from '../components/post/PostList';
import { counterStore } from '../modules';
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
    counterBox: document.querySelector('#counterBox'),
    btnIncrease: document.querySelector('.increase'),
    btnDecrease: document.querySelector('.decrease'),
  };

  const count = () => {
    const state = counterStore.getState(); // 현재 상태를 불러옴.
    compPostList.render(Counter(state.number), $elem.counterBox);
  };

  compPostList.oceanEffect(() => {
    const countEvent = () => {
      $elem.btnIncrease.onclick = () => {
        counterStore.dispatch(PLM.increase());
      };
      $elem.btnDecrease.onclick = () => {
        counterStore.dispatch(PLM.decrease());
      };
    };

    counterStore.subscribe(count);
    countEvent();
  }, $elem.counterBox);

  return (
    <div id="PostListBlock" class="common">
      {PostList(itemList, done)}
    </div>
  );
};

export default PostListContainer;
