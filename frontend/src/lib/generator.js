// 2. virtual node 생성

export const createRealNode = (virtualDOM) => {
  if (typeof virtualDOM === 'string') {
    return document.createTextNode(virtualDOM);
  }

  const elem = document.createElement(virtualDOM.type);

  Object.entries(virtualDOM.props || {})
    .filter(([attr, value]) => value)
    .forEach(([attr, value]) => elem.setAttribute(attr, value));

  const children = virtualDOM.children.map(createRealNode);

  // $el에 변환된 children dom을 추가한다.
  children.forEach((child) => elem.appendChild(child));

  return elem;
};

const render = (virtualDOM) => {
  const dom = createRealNode(virtualDOM);
  const $root = document.getElementById('root');

  //$root.removeChild($root.firstElementChild);
  return $root.appendChild(dom);
};

export default render;

/*
export const realDom = (virtualDOM) => {
  const dom = createRealNode(virtualDOM);
  return dom;
};
*/

/*
  function createElem(node) {
    if (typeof node === 'string') {
      return document.createTextNode(node);
    }
    const $el = document.createElement(node.type);
    node.children.map(createElem).forEach($el.appendChild.bind($el));
    return $el;
  }
  
  const a = (
    <ul class="list">
      <li>item 1</li>
      <li>item 2</li>
    </ul>
  );
  
  const node = createElem(a);
  document.body.appendChild(node);
  */

/*
  function render(vnode) {
    // Strings just convert to #text Nodes:
    if (vnode.split) return document.createTextNode(vnode);
  
    // create a DOM element with the nodeName of our VDOM element:
    let n = document.createElement(vnode.nodeName);
  
    // copy attributes onto the new node:
    let a = vnode.attributes || {};
    Object.keys(a).forEach((k) => n.setAttribute(k, a[k]));
  
    // render (build) and then append child nodes:
    (vnode.children || []).forEach((c) => n.appendChild(render(c)));
  
    return n;
  }
  
  const ITEMS = 'hello there people'.split(' ');
  
  // turn an Array into list items:
  let list = (items) => items.map((p) => <li> {p} </li>);
  
  // view with a call out ("partial") to generate a list from an Array:
  let vdom = (
    <div id="foo">
      <p>Look, a simple JSX DOM renderer!</p>
      <ul>{list(ITEMS)}</ul>
    </div>
  );
  
  // render() converts our "virtual DOM" (see below) to a real DOM tree:
  let dom = render(vdom);
  console.log(dom);
  // append the new nodes somewhere:
  document.body.appendChild(dom);
  
  // Remember that "virtual DOM"? It's just JSON - each "VNode" is an object with 3 properties.
  let json = JSON.stringify(vdom, null, '  ');
  // The whole process (JSX -> VDOM -> DOM) in one step:
  document.body.appendChild(render(<pre id="vdom">{json}</pre>));
  */

//----------------------------------------------------------------------------------------------------------------------------

/* 노드 생성 구문
  function createElement(type, props = {}, ...children) {
    // type이 funtion인 경우 예외 처리
    if (typeof type === 'function') {
      return type.apply(null, [props, ...children]);
    }
  
    return { type, props, children };
  }
  
  function h(type, props, ...children) {
    return { type, props, children };
  }
  
  function createElement(node) {
    if (typeof node === 'string') {
      return document.createTextNode(node);
    }
    const $el = document.createElement(node.type);
    node.children.map(createElement).forEach($el.appendChild.bind($el));
    return $el;
  }
  */

/* 버츄얼 돔 구조
  
  const virtualDOM = {
    type: 'ul',
    props: {},
    children: [
      { type: 'li', props: { className: 'item' }, children: 'React' },
      { type: 'li', props: { className: 'item' }, children: 'Redux' },
      { type: 'li', props: { className: 'item' }, children: 'TypeScript' },
      { type: 'li', props: { className: 'item' }, children: 'mobx' },
    ],
  };
  */

/* 렌더링 실행문
  
  // JSX -> VDOM:
  let vdom = <div id="foo">Hello!</div>;
  
  // VDOM -> DOM:
  let dom = render(vdom);
  
  // add the tree to <body>:
  document.body.appendChild(dom);
  */

/* 렌더링 구문
  
  function render(vnode) {
    // Strings just convert to #text Nodes:
    if (vnode.split) return document.createTextNode(vnode);
  
    // create a DOM element with the nodeName of our VDOM element:
    let n = document.createElement(vnode.nodeName);
  
    // copy attributes onto the new node:
    let a = vnode.attributes || {};
    Object.keys(a).forEach((k) => n.setAttribute(k, a[k]));
  
    // render (build) and then append child nodes:
    (vnode.children || []).forEach((c) => n.appendChild(render(c)));
  
    return n;
  }
  
  function renderElement(node) {
    // 해당 노드가 text 인 경우에 대한 예외 처리
    if (typeof node === 'string') {
      return document.createTextNode(node);
    }
    // type에 해당하는 element를 생성.
    const el = document.createElement(node.type);
  
    // 하위 element를 render한 후 하위에 추가해 준다.
    // 재귀 함수를 호출하도록 하여 마지막 노드까지 랜더링
    node.children.map(renderElement).forEach((element) => {
      el.appendChild(element);
    });
  
    // 생성된 Element를 반환.
    return el;
  }
  
  function render(newVdom, container) {
    // vdom vs newVdom : diff algorithm
    // 실제로 React는 해당 포인트에서
    // 기존의 old Virtual DOM과 new Virtual DOM의 차이점을
    // 찾아서 변경된 부분만 실제 Real DOM에서 새롭게 rendering 한다.
  
    container.appendChild(renderElement(newVdom));
  }
  
  */

/* 변화 감지 알고리즘
  
  function changed(node1, node2) {
    return (
      typeof node1 !== typeof node2 ||
      (typeof node1 === 'string' && node1 !== node2) ||
      node1.type !== node2.type
    );
  }
  
  function updateElement($parent, newNode, oldNode, index = 0) {
    if (!oldNode) {
      $parent.appendChild(createElement(newNode));
    } else if (!newNode) {
      $parent.removeChild($parent.childNodes[index]);
    } else if (changed(newNode, oldNode)) {
      $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
    } else if (newNode.type) {
      const newLength = newNode.children.length;
      const oldLength = oldNode.children.length;
      for (let i = 0; i < newLength || i < oldLength; i++) {
        updateElement(
          $parent.childNodes[index],
          newNode.children[i],
          oldNode.children[i],
          i,
        );
      }
    }
  }
  
  $reload.addEventListener('click', () => {
    updateElement($root, b, a);
  });
  */

/*
  
  let foo = <div id="foo">Hello!</div>;
  
  // 1. 가상돔 정의. 객체 형태
  // react 의 React.createElement 묘사
  function h(nodeName, attributes, ...args) {
    let children = args.length ? [].concat(...args) : null;
    return { nodeName, attributes, children };
  }
  
  function render(vnode) {
    // Strings just convert to #text Nodes:
    if (vnode.split) return document.createTextNode(vnode);
  
    // create a DOM element with the nodeName of our VDOM element:
    let n = document.createElement(vnode.nodeName);
  
    // copy attributes onto the new node:
    let a = vnode.attributes || {};
    Object.keys(a).forEach((k) => n.setAttribute(k, a[k]));
  
    // render (build) and then append child nodes:
    (vnode.children || []).forEach((c) => n.appendChild(render(c)));
  
    return n;
  }
  
  const ITEMS = 'hello there people'.split(' ');
  
  // turn an Array into list items:
  let list = (items) => items.map((p) => <li> {p} </li>);
  
  // view with a call out ("partial") to generate a list from an Array:
  let vdom = (
    <div id="foo">
      <p>Look, a simple JSX DOM renderer!</p>
      <ul>{list(ITEMS)}</ul>
    </div>
  );
  
  // render() converts our "virtual DOM" (see below) to a real DOM tree:
  let dom = render(vdom);
  console.log(dom);
  // append the new nodes somewhere:
  document.body.appendChild(dom);
  
  // Remember that "virtual DOM"? It's just JSON - each "VNode" is an object with 3 properties.
  let json = JSON.stringify(vdom, null, '  ');
  // The whole process (JSX -> VDOM -> DOM) in one step:
  document.body.appendChild(render(<pre id="vdom">{json}</pre>));
  
  */
