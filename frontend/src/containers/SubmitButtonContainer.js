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
      const state = editorStore.getState();
      //console.log(state, 'editor 스테이트');
      $elem.submitButton.onclick = () => {
        const _state = editorStore.getState();
        onPublish(_state);
        clickEvent();
      };

      if (state.post) {
        if (hashPath === 'update') {
          try {
            postUpdate(state.post);
          } catch (error) {
            console.error(error);
          }
        } else {
          try {
            postWrite(state.post);
          } catch (error) {
            console.error(error);
          }
        }
      }
    };

    async function postWrite(post) {
      const res = await fetch(`http://localhost:5000/api/`, {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify(post),
      });

      const body = await res.json();
      //console.log(body, '리스폰스 바디');

      if (body) {
        const postId = body[body.length - 1].postId;
        return (location.href = `#${postId}`);
      }
    }

    async function postUpdate(post) {
      const res = await fetch(`http://localhost:5000/api/${post.postId}`, {
        method: 'PATCH',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify(post),
      });

      //console.log(res.body);

      location.href = `#${post.postId}`;
    }

    editorStore.subscribe(onPublish);
    clickEvent();
  }, $elem.submitButtonBlock);
  /*
  Instance.oceanEffect(
    () => {
      return () => {
        dispatch(mount);
      };
    },
    '',
    true,
  );
  */

  return <div id="submitButtonWrap">{submitButton()}</div>;
};

export default SubmitButtonContainer;
