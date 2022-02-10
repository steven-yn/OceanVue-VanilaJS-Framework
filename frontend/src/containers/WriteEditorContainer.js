import Header from '../components/common/header';
import WriteEditor from '../components/write/WriteEditor';
import Component from '../core/Component';
import { editorStore } from '../modules';
import * as WM from '../modules/writeModule';
import { postStore } from '../modules';

/** @jsx h */
// eslint-disable-next-line no-unused-vars
const h = (type, props, ...children) => {
  return { type, props, children };
};

const compWrite = new Component();

const WriteEditorContainer = () => {
  const $elem = {
    writeEditorBlock: document.querySelector('#writeEditorBlock'),
    titleinput: document.querySelector('#titleInput'),
    authorInput: document.querySelector('#authorInput'),
    editorInput: document.querySelector('#editorInput'),
  };

  console.log('wr컨테이너 실행');

  const dispatch = editorStore.dispatch;
  const mount = WM.initialize;
  const hashPath = window.location.hash.replace('#', '');

  const onFix = () => {
    const state = postStore.getState();

    return state.post;
  };

  const onChangeField = (payload) => {
    if (!payload) {
      return;
    } else {
      dispatch(WM.changeField(payload));
    }
  };

  //dispatch(mount);

  compWrite.oceanEffect(() => {
    if (hashPath === 'update') {
      let post = onFix();
      if (post) {
        dispatch(WM.setOriginalPost(post));
      }
      const state = editorStore.getState();
      $elem.titleinput.value = state.title;
      $elem.authorInput.value = state.author;
      $elem.editorInput.value = state.body;
    } else if (hashPath === 'write') {
      dispatch(mount);
    }

    const changeEvent = () => {
      $elem.titleinput.onchange = (e) => {
        onChangeField({ key: 'title', value: e.target.value });
      };

      $elem.authorInput.onchange = (e) => {
        onChangeField({ key: 'author', value: e.target.value });
      };

      $elem.editorInput.onchange = (e) => {
        onChangeField({ key: 'body', value: e.target.value });
      };
    };

    editorStore.subscribe(onChangeField);
    changeEvent();
  }, $elem.writeEditorBlock);

  return (
    <div id="Wrap">
      {Header()}
      <div class="spacer"></div>
      <div id="writeEditorWrap">{WriteEditor(compWrite)}</div>
    </div>
  );
};

export default WriteEditorContainer;
