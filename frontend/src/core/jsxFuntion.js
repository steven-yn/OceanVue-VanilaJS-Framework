const jsx = (type, props, ...children) => {
  return { type, props, children };
};

export const arrayJsx = (type, props, ...children) => {
  if (Array.isArray(...children)) {
    const arrConv = Object.values(children[0]);
    children = arrConv;
  }

  return { type, props, children };
};

export default jsx;
