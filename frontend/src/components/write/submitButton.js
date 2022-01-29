/** @jsx h */

const h = (type, props, ...children) => {
  return { type, props, children };
};

const submitButton = () => {
  return (
    <div id="submitButtonBlock">
      <button>작성</button>
    </div>
  );
};

export default submitButton;
