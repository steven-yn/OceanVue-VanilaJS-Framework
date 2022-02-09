import submitButton from '../components/write/submitButton';
import { editorStore } from '../modules';
import * as WM from '../modules/writeModule';

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

  const onPublish = (payload, post) => {
    if (!payload) {
      return;
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

    /*
    if (postId) {
      dispatch(WM.updatePost({ title, author, body, postId: postId }));
      return;
    }*/
  };

  /*
  const onChangeField = (payload) => {
    if (!payload) {
      return;
    } else {
      dispatch(WM.changeField(payload));
    }
  };
*/
  Instance.oceanEffect(() => {
    const clickEvent = () => {
      const state = editorStore.getState();

      $elem.submitButton.onclick = () => {
        const _state = editorStore.getState();
        onPublish(_state);
        clickEvent();
      };

      if (state.post) {
        try {
          postWrite(state.post);
        } catch (error) {
          console.error(error);
        }
      }
    };

    async function postWrite(post) {
      const res = await fetch(`http://localhost:5000/api/`, {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify(post),
      });

      const req = await res.body;

      console.log(res, req);
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
