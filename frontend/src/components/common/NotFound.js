/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import jsx from '../../core/jsxFuntion';
import Header from './header';

const NotFound = () => {
  return (
    <div id="wrap">
      {Header()}
      <div class="spacer"></div>
      <div id="notFound">
        <div>
          <h1>Page Not Found : 404</h1>
          <p>페이지를 찾을수 없습니다.</p>
          <p>잘못된 경로를 입력했거나 삭제된 게시물 입니다.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
