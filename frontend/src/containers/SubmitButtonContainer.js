import submitButton from '../components/write/submitButton';
import { editorStore } from '../modules';
import * as WM from '../modules/writeModule';
import PostListContainer from './PostListContainer';

/** @jsx h */
// eslint-disable-next-line no-unused-vars
const h = (type, props, ...children) => {
  return { type, props, children };
};

const SubmitButtonContainer = (Instance) => {
  const $elem = {
    submitButtonBlock: document.querySelector('#submitButtonBlock'),
    submitButton: document.querySelector('#submitButton'),
  };

  const dispatch = editorStore.dispatch;
  const hashPath = window.location.hash.replace('#', '');

  const getState = () => {
    return editorStore.getState();
  };
  let setState = {};

  const onPublish = (payload) => {
    if (!payload) {
      return;
    } else if (hashPath === 'update') {
      dispatch(WM.updatePost(payload));
    } else {
      const { title, author, body } = payload;
      dispatch(
        WM.writePost({
          title,
          author,
          body,
        }),
      );
    }
  };

  Instance.oceanEffect(() => {
    const clickEvent = () => {
      $elem.submitButton.onclick = () => {
        setState = getState();
        onPublish(getState());
        if (setState) {
          if (hashPath === 'update') {
            postUpdate(setState);
          } else {
            postWrite(setState);
          }
        }
      };
    };

    async function postWrite(state) {
      const res = await fetch(`http://localhost:5000/api/`, {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify(state),
      });

      const body = await res.json();
      //console.log(body, '리스폰스 바디');
      //console.log(state, 'write 할때 state');

      if (res.ok) {
        PostListContainer(body, res.ok);
        const postId = body[body.length - 1].postId;
        return (location.href = `#${postId}`);
      }
    }

    async function postUpdate(state) {
      const res = await fetch(`http://localhost:5000/api/${state.postId}`, {
        method: 'PATCH',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify(state),
      });

      const body = await res.json();
      //console.log(body, '리스폰스 바디');
      //console.log(state, 'write 할때 state');

      if (res.ok) {
        PostListContainer(body, res.ok);
        return (location.href = `#${setState.postId}`);
      }
    }

    editorStore.subscribe(onPublish);
    clickEvent();
  }, $elem.submitButtonBlock);

  return <div id="submitButtonWrap">{submitButton()}</div>;
};

export default SubmitButtonContainer;
