import Header from '../components/common/header';
import WriteEditor from '../components/write/WriteEditor';
import Component from '../core/Component';
import { editorStore } from '../modules';
import * as WM from '../modules/writeModule';

/** @jsx h */
// eslint-disable-next-line no-unused-vars
const h = (type, props, ...children) => {
  return { type, props, children };
};

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

  const onChangeField = (payload) => {
    if (!payload) {
      return;
    } else {
      dispatch(WM.changeField(payload));
    }
  };

  dispatch(mount);

  compWrite.oceanEffect(() => {
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

const compWrite = new Component();
