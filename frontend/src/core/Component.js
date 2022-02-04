import Post from '../components/post/Post';
import PostListContainer from '../containers/PostListContainer';

// 생성자 함수

const Component = (function () {
  let $root = {};
  let _routes = []; // (바깥에서 참조 불가, App 의 routes에 저장이 된다.)
  let done = false;

  function Component($entry, initRoutes) {
    if ($entry) {
      $root = $entry;
      _routes = initRoutes;
      this.router(this);
    }
  }

  Component.prototype.router = function (entryInstance) {
    const router = function () {
      const hashPath = window.location.hash.replace('#', '');
      const uiComponent =
        _routes.find((route) => route.path === hashPath).component || '';

      entryInstance.render(uiComponent);
      if (hashPath === '') {
        entryInstance.getPostList();
      }
    };

    // 주소 변경시 router가 실행됨.
    window.addEventListener('hashchange', router);
    // 새로고침을 하면 DOMContentLoaded 이벤트가 발생하고
    // render 함수는 url의 hash를 취득해 새로고침 직전에 렌더링되었던 페이지를 다시 렌더링한다.
    window.addEventListener('DOMContentLoaded', router);
  };

  Component.prototype.render = function (virtualDOM, $elem = $root) {
    console.log('render 실행');
    const oldRealNode = $elem.firstElementChild;

    const createRealNode = (virtualDOM) => {
      if (typeof virtualDOM === 'string') {
        return document.createTextNode(virtualDOM);
      }

      const elem = document.createElement(virtualDOM.type);

      Object.entries(virtualDOM.props || {})
        .filter(([attr, value]) => value)
        .forEach(([attr, value]) => elem.setAttribute(attr, value));

      const children = virtualDOM.children.map(createRealNode);

      // elem에 변환된 children dom을 추가한다.
      children.forEach((child) => elem.appendChild(child));

      return elem;
    };

    const isDiffNode = (oldNode, newNode) => {
      let test = updateElement(oldNode, newNode, $elem);

      return test;
    };

    function updateElement(oldNode, newNode, parent = $root) {
      // 1. oldNode만 있는 경우
      if (!newNode && oldNode) {
        return oldNode.remove();
      }

      // 2. newNode만 있는 경우
      if (newNode && !oldNode) {
        return parent.appendChild(newNode);
      }

      // 3. oldNode와 newNode 모두 text 타입일 경우
      if (
        // typeof가 아니라 instanceof로 직접 비교한다.
        newNode instanceof Text &&
        oldNode instanceof Text
      ) {
        // Text일 경우 nodeValue로 값 비교가 가능하다.
        if (oldNode.nodeValue === newNode.nodeValue) return;

        // nodeValue의 값을 변경해준다.
        oldNode.nodeValue = newNode.nodeValue;
        return;
      }

      // 4. oldNode와 newNode의 태그 이름(type)이 다를 경우
      if (newNode.nodeName !== oldNode.nodeName) {
        const index = [...parent.childNodes].indexOf(oldNode);

        return oldNode.remove(), parent.appendChild(newNode, index); // undefined를 반환할 것이다.
      }

      // 5. oldNode와 newNode의 태그 이름(type)이 같을 경우
      // 가상돔(VirtualDOM)의 props를 넘기는게 아니기 때문에 oldNode와 newNode를 직접 넘긴다.
      updateAttributes(oldNode, newNode);

      // 6. newNode와 oldNode의 모든 자식 태그를 순회하며 1 ~ 5의 내용을 반복한다.
      // 일단 childNodes를 배열로 변환해야한다.
      const newChildren = [...newNode.childNodes];
      const oldChildren = [...oldNode.childNodes];
      const maxLength = Math.max(newChildren.length, oldChildren.length);
      for (let i = 0; i < maxLength; i++) {
        updateElement(oldChildren[i], newChildren[i], oldNode);
      }
    }

    function updateAttributes(oldNode, newNode) {
      const oldProps = [...oldNode.attributes];
      const newProps = [...newNode.attributes];

      // 달라지거나 추가된 Props를 반영
      for (const { name, value } of newProps) {
        if (value === oldNode.getAttribute(name)) continue;
        oldNode.setAttribute(name, value);
      }

      // 없어진 props를 attribute에서 제거
      for (const { name } of oldProps) {
        if (newNode.getAttribute(name) !== undefined) continue;
        oldNode.removeAttribute(name);
      }
    }

    console.log(oldRealNode);

    let newRealNode = createRealNode(virtualDOM);

    console.log(newRealNode);

    isDiffNode(oldRealNode, newRealNode);
  };

  Component.prototype.componentDidMount = function (fn) {
    return fn;
  };

  Component.prototype.getPostList = async function () {
    const res = await fetch(`http://localhost:5000/api/`).then((done = true));
    const body = await res.json();
    const idList = [];

    await body.forEach((item) => idList.push(item.postId));

    // postId 로 post routes 등록
    this.dataRouting(idList);

    // PostList 에 Props 전달
    const $PostListWrap = document.getElementById('PostListWrap');

    if (done) {
      this.render(PostListContainer(body, done), $PostListWrap);
    }
  };

  Component.prototype.dataRouting = function (idList) {
    //

    const postRoute = idList.map((id) => ({
      path: `${id}`,
      component: Post(id),
    }));

    postRoute.forEach((route) => _routes.push(route));

    /*
      const routes = [
        { path: '', component: App() },
        { path: 'write', component: Write() },
        { path: ...postId, component: Post(...postId) }
        { ... }
      ];
    */
  };
  return Component;
})();

export default Component;
