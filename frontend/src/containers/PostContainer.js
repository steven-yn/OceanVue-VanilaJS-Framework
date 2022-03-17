/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import jsx from '../core/jsxFuntion';
import Header from '../components/common/Header';
import Post from '../components/post/Post';
import Component from '../core/Component';
import postReq from '../core/postAPI';
import { store } from '../modules';
import { readPost } from '../modules/PostModule';

const compPost = new Component();

const PostContainer = () => {
  const $elem = {
    PostWrap: document.querySelector('#PostWrap'),
    deleteButton: document.querySelector('#deleteButton'),
  };

  const dispatch = store.post.dispatch;
  const getState = () => {
    return store.post.getState();
  };
  let setState = {};
  const hashPath = Number(window.location.hash.replace('#', ''));

  const getPost = async (postId) => {
    try {
      const res = await postReq.get(`/api/${postId}`);

      if (res.status === 404) {
        return (location.href = '#error');
      }

      const body = await res.json();

      return dispatch(readPost(body));
    } catch (error) {
      return alert(error);
    }
  };

  const deletePost = async (postId) => {
    try {
      const res = await postReq.remove(`/api/${postId}`);

      if (res.status === 404) {
        return (location.href = '#error');
      }

      compPost.refresh();

      location.href = '#';
    } catch (error) {
      return alert(error);
    }
  };

  const onDelete = (target) => {
    target.onclick = () => {
      deletePost(hashPath);
    };
  };

  const onLoad = () => {
    if (getState().post) {
      setState = getState();
      compPost.render(Post(setState.post, true), $elem.PostWrap);

      $elem.deleteButton = document.querySelector('#deleteButton');
      onDelete($elem.deleteButton);
    }
  };

  compPost.oceanEffect(() => {
    getPost(hashPath);
    store.post.subscribe(onLoad);
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
