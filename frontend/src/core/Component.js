import Post from '../components/post/Post';
import PostList from '../components/post/PostList';
import req from '../lib/api/xmrFetch';
import { PostItem } from '../components/post/PostList';

// 생성자 함수

const Component = (function () {
  let $root = {};
  let _routes = []; // (바깥에서 참조 불가, App 의 routes에 저장이 된다.)
  let _state = {};
  let load = true;
  let done = false;

  function Component($entry, initRoutes) {
    if ($entry) {
      $root = $entry;
      _routes = initRoutes;
    }
    this.vdom = [];
    this.vNewDom = [];
  }

  Component.prototype.defineState = function (compState) {
    _state = compState;
  };

  Component.prototype.loadState = function () {};

  Component.prototype.useState = function (initState) {
    // const [state, setState] = useState();
  };

  Component.prototype.render = function (virtualDOM, $elem = '') {
    console.log('render 실행');

    const defineVirtualNode = (virtualDOM) => {
      this.vdom.push(virtualDOM);

      if (typeof virtualDOM === 'string') {
        return document.createTextNode(virtualDOM);
      }

      const elem = document.createElement(virtualDOM.type);

      Object.entries(virtualDOM.props || {})
        .filter(([attr, value]) => value)
        .forEach(([attr, value]) => elem.setAttribute(attr, value));

      // 이곳의 virtualDOM 에서 부터 시작한다고 생각하자.
      //console.log(virtualDOM);
      const children = virtualDOM.children.map(defineVirtualNode);
      //console.log(children);
      //console.log(virtualDOM);
      // elem에 변환된 children dom을 추가한다.
      children.forEach((child) => elem.appendChild(child));

      return elem;
    };

    const isDiffNode = (oldVdom, newVdom) => {
      const diff = newVdom.filter((ne) => !oldVdom.includes(ne));
      diff.forEach((el) => defineVirtualNode(el));
    };
    /*
    const createRealNode = (targetList) => {
      targetList.forEach((vnode) => {
        if (typeof vnode === 'string') {
          return document.createTextNode(vnode);
        }
        const elem = document.createElement(vnode.type);
      });
      //console.log(targetList);
     
      const reCreate = (vnode) => {
        

        const elem = document.createElement(vnode.type);
        const children = virtualDOM.children.map(reCreate);
        children.forEach((child) => elem.appendChild(child));

        return elem;
      };

      targetList.forEach((vnode) => {});
      
    };
*/
    const oldDom = this.vdom;
    this.vdom = [];

    let dom = defineVirtualNode(virtualDOM);

    const newDom = this.vdom;
    isDiffNode(oldDom, newDom);

    /*
    const targetVnode = isDiffNode(oldDom, newDom);

    targetVnode.map()
    const renderDom = createRealNode();
*/
    // 페이지 전환, 새로고침시 root 하위 요소가 있으면 모든 노드를 제거.

    if ($elem && done) {
      return $elem.appendChild(dom);
    } else {
      return $root.appendChild(dom);
    }
  };

  /*
  
const children = virtualDOM.children.map(defineVirtualNode);

      //console.log(virtualDOM);
      // elem에 변환된 children dom을 추가한다.
      children.forEach((child) => elem.appendChild(child));

      return elem;
    };
    const child = vnode.children.map(createRealNode);
        child.forEach((vchild) => 
  */

  Component.prototype.getPostId = async function () {
    const res = await fetch(`http://localhost:5000/api/`).then((done = true));
    const body = await res.json();
    const idList = [];

    await body.forEach((item) => idList.push(item.postId));

    // postId 로 post routes 등록
    this.dataRouting(idList);

    // PostList 에 Props 전달
    const $PostListWrap = document.getElementById('PostListWrap');
    this.render(PostList(body, done), $PostListWrap);
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

/*
const Component = (function () {
  
      if (!new.target) {
      return new Component();
    }
  
    let $target = document.querySelector('#app');
    let $props = '';
    let $state = '';
    let _temp = '';
  
    function Component($target, $props = '') {
      // 프로퍼티는 pubilc 하므로 은닉되지 않는다.$target, $props
      // this.num =0;
      this.$target = $target;
      this.$props = $props; // $props 할당
      this.setup();
      this.setEvent(this.evt);
      this.stateRender();
    }
  
    Component.prototype.setup = function (initState) {};
  
    Component.prototype.mounted = function (
      mount = function () {
        return;
      },
    ) {
      //console.log(mount);
      return mount();
    };
  
    Component.prototype.templete = function (
      temp = function () {
        return '';
      },
    ) {
      _temp = temp();
    };
  
    Component.prototype.stateRender = function () {
      console.log($target);
      console.log(_temp);
      $target.innerHTML = _temp;
      this.mounted();
    };
  
    Component.prototype.setEvent = function (
      evt = function () {
        return;
      },
    ) {
      //console.log(evt);
      return evt();
    };
  
    Component.prototype.setState = function (newState) {
      this.$state = { ...this.$state, ...newState };
      this.stateRender();
    };
  
    Component.prototype.addEvent = function (eventType, selector, callback) {
      const children = [...$target.querySelectorAll(selector)];
      // selector에 명시한 것 보다 더 하위 요소가 선택되는 경우가 있을 땐
      // closest를 이용하여 처리한다.
      const isTarget = (target) =>
        children.includes(target) || target.closest(selector);
      $target.addEventListener(eventType, (event) => {
        if (!isTarget(event.target)) return false;
        callback(event);
      });
    };
  
    return Component;
  })();
  
  export default Component;
  
  //////////////////////////
  /*
      // 즉시실행 함수 내에서 선언된 은닉된 변수
      // this.$state = $state // public
      let _$state = 0; // private
    
      // this.$target = $target // public
      let _$target = 0; // private
    
      Component.prototype.sayHello = function () {
        console.log(`Hello ! element is ${this.$target}. state is ${_$state}`);
      };
    */

/*
    const counter = (function () {
      let counter = 0;
    
      return function (subFunc) {
        counter = subFunc(counter);
        return counter;
      };
    })();
    
    function increase(n) {
      return ++n;
    }
    
    function decrease(n) {
      return --n;
    }
    
    counter(increase);
    counter(decrease);
    
    function Circle(radius) {
        this.radius = radius;
        this.getArea = function () {
            return Math.Pi * this.radius ** 2;
        }
    }
    
    const circle1 = new Circle(1);
    const circel2 = new Circle(2);
    */

/*
    export const setup = (stateInit) => {
      stateInit;
    };
    
    export const template = ($state) => {
      const { items } = $state;
      console.log(items);
      return `
      <ul>
          ${items
            .map(
              (item, key) => `
            <li>
                ${item}
                <button class="deleteBtn" data-index="${key}">삭제</button>
            </li>
          `,
            )
            .join('')}
      </ul>
      <button class="addBtn">추가</button>
        `;
    };
    
    export const setEvent = ($target, $state) => {
      
    };
    
    export const stateRender = ($target, $state) => {
      $target.innerHTML = template($state);
    };
    
    export const setState = ($target, $state, newState) => {
      $state = { ...$state, ...newState };
      stateRender($target, $state);
    };
    
    export const addEvent = ($target, eventType, selector, callback) => {
      
    };
    
    
    $target.querySelector('.addBtn').addEventListener('click', () => {
        const { items } = $state;
        setState($target, {
          items: [...items, `item${items.length + 1}`],
        });
      });
      $target.querySelectorAll('.deleteBtn').forEach((deleteBtn) =>
        deleteBtn.addEventListener('click', ({ target }) => {
          const items = [...$state.items];
          items.splice(target.dataset.index, 1);
          setState($target, { items });
        }),
      );
    
      
      $target.addEventListener('click', ({ target }) => {
        const items = [...$state.items];
    
        if (target.classList.contains('addBtn')) {
          setState($target, { items: [...items, `item${items.length + 1}`] });
        }
    
        if (target.classList.contains('deleteBtn')) {
          items.splice(target.dataset.index, 1);
          setState($target, { items });
        }
      });
*/
