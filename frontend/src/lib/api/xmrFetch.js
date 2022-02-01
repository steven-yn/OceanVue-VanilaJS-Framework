const req = {
  get(url) {
    return fetch(url);
  },
  post(url, payload) {
    return fetch(url, {
      method: 'POST',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  },
  patch(url, payload) {
    return fetch(url, {
      method: 'PATCH',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  },
  delete(url) {
    return fetch(url, { method: 'DELETE' });
  },
};

export default req;

/* 2. 에러 처리
const wrongUrl = 'https://jsonplacr.typicode.c/xxx';

//부적절한 URL 지정되서 404 에러 발생.
fetch(wrongUrl)
  // res 는 HTTP res body
  .then((res) => {
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  })
  .then((todo) => console.log(todo))
  .catch((err) => console.log(err));
//
*/

// 3.CRUD 요청문 작성 및 요청보내기

// 3-1 get 요청
/*
export const readPostList = () => {
  req
    .get('http://localhost:5000/api/')
    .then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then((todos) => console.log(todos))
    .catch((err) => console.error(err));
};

export const readPost = (postId) => {
  req
    .get(`http://localhost:5000/api/${postId}`)
    .then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then((todos) => console.log(todos))
    .catch((err) => console.error(err));
};

// 3-2 post 요청

export const Post = () => {
  req
    .post('https://jsonplaceholder.typicode.com/todos', {
      userId: 1,
      title: 'JS',
      completed: false,
    })
    .then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then((todos) => console.log(todos))
    .catch((err) => console.error(err));
};

// 3-3 patch 요청

export const Patch = () => {
  req
    .patch('https://jsonplaceholder.typicode.com/todos/1', {
      completed: true,
    })
    .then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then((todos) => console.log(todos))
    .catch((err) => console.error(err));
};

// 3-4 delete 요청

export const Delete = () => {
  req
    .delete('https://jsonplaceholder.typicode.com/todos/1')
    .then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then((todos) => console.log(todos))
    .catch((err) => console.error(err));
};
*/
// fetch 함수는 res 객체를 래핑한 promise 객체를 반환한다.
// 첫번쨰 인수로 http 요청을 전송할 URL 만 전달하면 GET 요청을 전송.

/* 1. fetch 와 Response 객체
fetch('https://jsonplaceholder.typicode.com/todos/1')
  // response 는 HTTP 응답을 나타내는 Response 객체.
  // json 메서드를 사용하여 Response 객체에서 HTTP res body를 취득하여 역직렬화.
  .then((response) => response.json())
  // json 은 역직렬화 된 HTTP res body.
  .then((json) => console.log(json));
*/

/* 2. 에러 처리
const wrongUrl = 'https://jsonplacr.typicode.c/xxx';

//부적절한 URL 지정되서 404 에러 발생.
fetch(wrongUrl)
  // res 는 HTTP res body
  .then((res) => {
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  })
  .then((todo) => console.log(todo))
  .catch((err) => console.log(err));
//
*/

/*
// 3.CRUD 요청문 작성 및 요청보내기
const req = {
  get(url) {
    return fetch(url);
  },
  post(url, payload) {
    return fetch(url, {
      method: 'POST',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  },
  patch(url, payload) {
    return fetch(url, {
      method: 'PATCH',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  },
  delete(url) {
    return fetch(url, { method: 'DELETE' });
  },
};

// 3-1 get 요청
req
  .get('https://jsonplaceholder.typicode.com/todos/1')
  .then((res) => {
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  })
  .then((todos) => console.log(todos))
  .catch((err) => console.error(err));

// 3-2 post 요청
req
  .post('https://jsonplaceholder.typicode.com/todos', {
    userId: 1,
    title: 'JS',
    completed: false,
  })
  .then((res) => {
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  })
  .then((todos) => console.log(todos))
  .catch((err) => console.error(err));

// 3-3 patch 요청
req
  .patch('https://jsonplaceholder.typicode.com/todos/1', {
    completed: true,
  })
  .then((res) => {
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  })
  .then((todos) => console.log(todos))
  .catch((err) => console.error(err));

// 3-4 delete 요청
req
  .delete('https://jsonplaceholder.typicode.com/todos/1')
  .then((res) => {
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  })
  .then((todos) => console.log(todos))
  .catch((err) => console.error(err));
*/
