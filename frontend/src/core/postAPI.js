const postReq = {
  getList(url) {
    return fetch(url, {
      method: 'GET',
      headers: { 'content-Type': 'application/json' },
    });
  },

  get(url) {
    return fetch(url, {
      headers: { 'content-Type': 'application/json' },
    });
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

  delete(url, payload) {
    return fetch(url, {
      method: 'DELETE',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  },
};

export default postReq;
