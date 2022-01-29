function createResource(promise) {
  let status = 'pending';
  let result = promise.then(
    (resolved) => {
      status = 'success';
      result = resolved;
    },
    (rejected) => {
      status = 'error';
      result = rejected;
    },
  );
  return {
    read() {
      if (status === 'pending') throw result;
      if (status === 'error') throw result;
      if (status === 'success') return result;
      throw new Error('This should be impossible');
    },
  };
}
