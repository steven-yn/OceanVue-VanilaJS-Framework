/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import jsx from '../core/jsxFuntion';
import submitButton from '../components/write/submitButton';
import { store } from '../modules';
import * as WM from '../modules/writeModule';
import postReq from '../core/postAPI';

const SubmitButtonContainer = (Instance) => {
  const $elem = {
    submitButtonBlock: document.querySelector('#submitButtonBlock'),
    submitButton: document.querySelector('#submitButton'),
  };

  const dispatch = store.editor.dispatch;
  const hashPath = window.location.hash.replace('#', '');

  const getState = () => {
    return store.editor.getState();
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
    const postWrite = async (state) => {
      try {
        const res = await postReq.post('/api/', state);

        const body = await res.json();

        if (res.status === 404) return (location.href = '#error');
        else if (res.ok) {
          Instance.refresh();

          const postId = body[body.length - 1].postId;

          return (location.href = `#${postId}`);
        }
      } catch (error) {
        return alert(error);
      }
    };

    const postUpdate = async (state) => {
      try {
        const res = await postReq.patch(`/api/${state.postId}`, '');

        if (res.status === 404) return (location.href = '#error');
        else if (res.ok) {
          Instance.refresh();

          return (location.href = `#${setState.postId}`);
        }
      } catch (error) {
        return alert(error);
      }
    };

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

    store.editor.subscribe(onPublish);
    clickEvent();
  }, $elem.submitButtonBlock);

  return <div id="submitButtonWrap">{submitButton()}</div>;
};

export default SubmitButtonContainer;
