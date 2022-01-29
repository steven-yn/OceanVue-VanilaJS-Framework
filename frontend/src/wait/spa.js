const navigation = document.getElementById('navigation');
const state = { page_id: 1, user_id: 5 };
const title = '';
const url = '/';

// 네비게이션을 클릭하면 주소창의 url이 변경되므로 HTTP 요청이 서버로 전송된다.
// preventDefault를 사용하여 이를 방지하고 history 관리를 위한 처리를 실행한다.
const customRouter = () => {
  navigation.addEventListener('click', (e) => {
    if (!e.target.matches('#navigation > li > a')) return;

    e.preventDefault();

    // 이동할 페이지의 path
    const path = e.target.getAttribute('href');

    // 주소창의 url은 변경되지만 HTTP 요청이 서버로 전송되지는 않는다.
    window.history.pushState({ path }, null, path);

    renderHTML(createRealNode(Service));
  });
};

const renderHTML = (routingNode) => {
  const $root = document.getElementById('root');

  return $root.replaceChild(routingNode, $root.firstElementChild);
};

customRouter();
/*
var controller = new AbortController();
window.addEventListener('load', function (e) {
  e.preventDefault();
  //window.location.replace('/');
  const replace = () => {
    window.history.pushState(
      window.location.origin,
      null,
      window.location.origin,
    );

    window.history.replaceState(
      window.location.origin,
      null,
      window.location.origin,
    );
  };
  replace();
  console.log('load event!');
  console.log(window.location.origin);
});
*/
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  const rooturl = location.replace('/');
  window.location.reload(rooturl);

  /*
  const replace = () => {
    window.history.pushState(
      window.location.origin,
      null,
      window.location.origin,
    );

    window.history.replaceState(
      window.location.origin,
      null,
      window.location.origin,
    );

    window.open(window.location.origin);
  };
  replace();
  */
  /*
  if (document.readyState == 'complete') {
    
  }
  */

  //window.location.replace('/');
  console.log('beforeunload event !');
});

/*
var controller = new AbortController();
window.addEventListener('load', function (e) {
  e.preventDefault();
  //window.location.replace('/');
  const replace = () => {
    window.history.pushState(
      window.location.origin,
      null,
      window.location.origin,
    );

    window.history.replaceState(
      window.location.origin,
      null,
      window.location.origin,
    );
  };
  replace();
  console.log('load event!');
  console.log(window.location.origin);
});
*/
/*
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  const rooturl = location.replace('/');
  window.location.reload(rooturl);

  
  const replace = () => {
    window.history.pushState(
      window.location.origin,
      null,
      window.location.origin,
    );

    window.history.replaceState(
      window.location.origin,
      null,
      window.location.origin,
    );

    window.open(window.location.origin);
  };
  replace();

  if (document.readyState == 'complete') {
    
  }

  //window.location.replace('/');
  console.log('beforeunload event !');
});
*/

/*
window.addEventListener('unload', function (e) {
  e.preventDefault();
  controller.abort();
  window.location.replace(window.location.origin);
  const replace = () => {
    window.history.pushState(
      window.location.origin,
      null,
      window.location.origin,
    );

    window.history.replaceState(
      window.location.origin,
      null,
      window.location.origin,
    );
  };
  replace();

  console.log('unload event !');
});
*/
/*
window.addEventListener('beforeunload', (event) => {
  // 명세에 따라 preventDefault는 호출해야하며, 기본 동작을 방지합니다.
  event.preventDefault();
});

window.onload = (e) => {
  history.replaceState({}, null, '/');
  e.preventDefault();
};
const refreshLocation = () => {
  window.onbeforeunload = (e) => {
    console.log(window.location.pathname);
    window.history.pushState({}, null, '/');
    window.history.replaceState({}, null, '/');
    history.replaceState({}, null, location.pathname);
  };
  return window.history.pushState({}, null, '/');
};

refreshLocation();
*/
//window.location.reload();

// window.location.reload(true);

/*
window.onload = () => {
  // history class 에 해당하는 요소에 클릭이벤트 달기
  const historyLinker = document.querySelectorAll('.history');

  historyLinker.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      // 클릭시 라우트 어트리뷰트를 겟
      const pathName = event.target.getAttribute('route');

      historyRouterPush(pathName, { project });
    });
  });
};
*/

/* //pointma hash
const root = document.getElementById('root');

const routes = {
  // hash: url path
  '': '/data/home.json',
  service: '/data/service.json',
  about: '/data/about.html',
};

const render = async () => {
  // url의 hash를 취득
  const hash = window.location.hash.replace('#', '');
  const url = routes[hash];

  try {
    const res = await fetch(url);
    const contentType = res.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      const json = await res.json();
      root.innerHTML = `<h1>${json.title}</h1><p>${json.content}</p>`;
    } else {
      root.innerHTML = await res.text();
    }
  } catch (err) {
    console.error(err);
  }
};

// 네비게이션을 클릭하면 url의 hash가 변경되기 때문에 history 관리가 가능하다.
// 단, url의 hash만 변경되면 서버로 요청은 수행하지 않는다.
// url의 hash가 변경하면 발생하는 이벤트인 hashchange 이벤트를 사용하여 hash의 변경을 감지하여 필요한 ajax 요청을 수행한다.
// hash 방식의 단점은 url에 /#foo와 같은 해시뱅(HashBang)이 들어간다는 것이다.
window.addEventListener('hashchange', render);

// 새로고침을 하면 DOMContentLoaded 이벤트가 발생하고
// render 함수는 url의 hash를 취득해 새로고침 직전에 렌더링되었던 페이지를 다시 렌더링한다.
window.addEventListener('DOMContentLoaded', render);
*/

/* //pointma pjax
const root = document.getElementById('root');
const navigation = document.getElementById('navigation');

const routes = {
  // path: url path
  '/': '/data/home.json',
  '/service': '/data/service.json',
  '/about': '/data/about.html',
};

const render = async path => {
  const url = routes[path];

  try {
    const res = await fetch(url);
    const contentType = res.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      const json = await res.json();
      root.innerHTML = `<h1>${json.title}</h1><p>${json.content}</p>`;
    } else {
      root.innerHTML = await res.text();
    }
  } catch (err) {
    console.error(err);
  }
};

// pjax 방식은 hash를 사용하지 않으므로 hashchange 이벤트를 사용할 수 없다.
// popstate 이벤트는 pushState에 의해 발생하지 않고
// 이전페이지/다음페이지 버튼을 클릭하거나 history.forward/back/go(n)에 의해
// history entry가 변경되면 발생한다.
window.addEventListener('popstate', e => {
  // e.state는 pushState 메서드의 첫번째 인수
  console.log('[popstate]', e.state); // {path: '/'} {path: '/service'} {path: '/about'}

  // 이전페이지 / 다음페이지 버튼이 클릭되면 render를 호출
  render(e.state ? e.state.path : '/');
});

// 네비게이션을 클릭하면 주소창의 url이 변경되므로 HTTP 요청이 서버로 전송된다.
// preventDefault를 사용하여 이를 방지하고 history 관리를 위한 처리를 실행한다.
navigation.addEventListener('click', e => {
  if (!e.target.matches('#navigation > li > a')) return;

  e.preventDefault();

  // 이동할 페이지의 path
  const path = e.target.getAttribute('href');

  // 주소창의 url은 변경되지만 HTTP 요청이 서버로 전송되지는 않는다.
  window.history.pushState({ path }, null, path);

  // path에 의한 ajax 요청
  render(path);
});

// 웹페이지가 처음 로딩되었을 때
render('/');

// 새로고침을 클릭하면 현 페이지(예를 들어 loclahost:5004/service)가 서버에 요청된다.
// 이에 응답하는 처리는 서버 측에 구현되어야 한다.
*/

/*
const navigation = document.getElementById('navigation');
const state = { page_id: 1, user_id: 5 };
const title = '';
const url = '/';

// 네비게이션을 클릭하면 주소창의 url이 변경되므로 HTTP 요청이 서버로 전송된다.
// preventDefault를 사용하여 이를 방지하고 history 관리를 위한 처리를 실행한다.
const customRouter = () => {
  navigation.addEventListener('click', (e) => {
    if (!e.target.matches('#navigation > li > a')) return;

    e.preventDefault();

    // 이동할 페이지의 path
    const path = e.target.getAttribute('href');

    // 주소창의 url은 변경되지만 HTTP 요청이 서버로 전송되지는 않는다.
    window.history.pushState({ path }, null, path);

    renderHTML(createRealNode(Service));
  });
};

const renderHTML = (routingNode) => {
  const $root = document.getElementById('root');

  return $root.replaceChild(routingNode, $root.firstElementChild);
};

customRouter();
*/

/*

<ul class="navbar">
          <li class="history" route="/home">
            Home
          </li>
          <li class="history" route="/about">
            About
          </li>
          <li class="history" route="/project">
            Project
          </li>
          <li>Join</li>
          <li id="login">Login</li>
        </ul>

const routes = {
  // path: url path
  '/': '/',
  '/project': '/project',
  '/about': '/about',
};

const historyRouterPush = (pathName, element) => {
  window.history.pushState({}, pathName, window.location.origin + pathName);
  renderHTML(element, routes[pathName]);
};

const renderHTML = (element, route) => {
  element.innerHTML = route;
};

window.onload = () => {
  // history class 에 해당하는 요소에 클릭이벤트 달기
  const historyLinker = document.querySelectorAll('.history');

  historyLinker.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      // 클릭시 라우트 어트리뷰트를 겟
      const pathName = event.target.getAttribute('route');

      historyRouterPush(pathName, { project });
    });
  });
};
*/
