/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import jsx from './core/jsxFuntion';
import Header from './components/common/Header';
import PostListContainer from './containers/PostListContainer';
import WriteEditorContainer from './containers/WriteEditorContainer';
import PostContainer from './containers/PostContainer';
import Component from './core/Component';
import './css/main.css';

const App = () => {
  return (
    <div id="wrap">
      {Header()}
      <div class="spacer"></div>
      <div id="PostListWrap">{PostListContainer()}</div>
    </div>
  );
};

const $entry = document.getElementById('root');

// 스택 형태로 routes 를 생성
const routes = [
  { path: '', component: App },
  { path: 'write', component: WriteEditorContainer },
  { path: ':postId', component: PostContainer },
  { path: 'update', component: WriteEditorContainer },
];

new Component($entry, routes);
