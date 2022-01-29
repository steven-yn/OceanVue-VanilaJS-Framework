/** @jsx h */
import Header from '../common/header';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import submitButton from './submitButton';

const h = (type, props, ...children) => {
  return { type, props, children };
};

const quillLoad = () => {
  const quillElement = document.getElementById('editor');
  new Quill(quillElement, {
    theme: 'snow',
    placeholder: '내용을 작성하세요',
    modules: {
      // 더 많은 옵션
      // https://quilljs.com/docs/modules/toolbar/ 참고
      toolbar: [
        [{ header: '1' }, { header: '2' }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['blockquote', 'code-block', 'link', 'image'],
      ],
    },
  });
};

function* genFunc() {
  yield quillLoad();
}

export const waitCreate = genFunc();

export const Write = () => {
  return (
    <div id="Wrap">
      {Header()}
      <div class="spacer"></div>
      <div id="writerBlock" class="common">
        <input id="titleInput" placeholder="제목을 입력하세요" />
        <div id="editorWrapper">
          <div id="editor"></div>
        </div>
        {submitButton()}
      </div>
    </div>
  );
};
