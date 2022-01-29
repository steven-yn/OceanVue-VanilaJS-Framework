const Component = (function () {
  /*
      if (!new.target) {
      return new Component();
    }
  */
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
