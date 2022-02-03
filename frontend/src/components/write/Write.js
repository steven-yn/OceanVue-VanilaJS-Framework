/** @jsx h */
import Header from '../common/header';
import submitButton from './submitButton';

const h = (type, props, ...children) => {
  return { type, props, children };
};

// export const waitCreate = genFunc();

export const Write = () => {
  return (
    <div id="Wrap">
      {Header()}
      <div class="spacer"></div>
      <div id="writerBlock" class="common">
        <input id="titleInput" placeholder="제목을 입력하세요" />
        <input id="editor" placeholder="내용을 입력하세요" />
        {submitButton()}
      </div>
    </div>
  );
};
