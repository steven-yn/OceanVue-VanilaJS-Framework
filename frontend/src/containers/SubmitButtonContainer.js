import submitButton from '../components/write/submitButton';
import { editorStore } from '../modules';
import * as WM from '../modules/writeModule';

/** @jsx h */
// eslint-disable-next-line no-unused-vars
const h = (type, props, ...children) => {
  return { type, props, children };
};
/*
    if (postId) {
      dispatch(WM.updatePost({ title, author, body, postId: postId }));
      return;
    }*/
/*
  const onChangeField = (payload) => {
    if (!payload) {
      return;
    } else {
      dispatch(WM.changeField(payload));
    }
  };
*/
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
      setState = getState();

      $elem.submitButton.onclick = () => {
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
      console.log(body, '리스폰스 바디');

      if (body) {
        return (location.href = `#${setState.postId}`);
      }
    }

    async function postUpdate(state) {
      const res = await fetch(`http://localhost:5000/api/${state.postId}`, {
        method: 'PATCH',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify(state),
      });

      console.log(res.body);

      return (location.href = `#${setState.postId}`);
    }

    editorStore.subscribe(onPublish);
    clickEvent();
  }, $elem.submitButtonBlock);

  return <div id="submitButtonWrap">{submitButton()}</div>;
};

export default SubmitButtonContainer;
