/** @jsx h */
import Header from '../components/common/header';
import Post from '../components/post/Post';
import Component from '../core/Component';
import { postStore } from '../modules';
import { readPost } from '../modules/PostModule';

// eslint-disable-next-line no-unused-vars
const h = (type, props, ...children) => {
  return { type, props, children };
};

const compPost = new Component();

const PostContainer = () => {
  console.log('post컨테이너 실행');
  const $elem = {
    PostWrap: document.querySelector('#PostWrap'),
  };

  const dispatch = postStore.dispatch;

  const hashPath = Number(window.location.hash.replace('#', ''));

  const onLoad = () => {
    const state = postStore.getState();
    if (state.post) {
      console.log(state.post);
      compPost.render(Post(state.post, true), $elem.PostWrap);
    }
  };

  async function getPost(postId) {
    const res = await fetch(`http://localhost:5000/api/${postId}`);
    const body = await res.json();

    return dispatch(readPost(body));
  }

  compPost.oceanEffect(() => {
    getPost(hashPath);
    postStore.subscribe(onLoad);
  }, $elem.PostWrap);

  return (
    <div id="Wrap">
      {Header()}
      <div class="spacer"></div>
      <div id="PostWrap">{Post()}</div>
    </div>
  );
};

export default PostContainer;
