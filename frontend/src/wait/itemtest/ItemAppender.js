import Component from '../core/Component';

const ItemAppender = function ($target, $props) {
  const component = new Component($target, $props);

  console.log($target);
  console.log($props);

  component.templete(() => {
    return `<input type="text" class="appender" placeholder="아이템 내용 입력" />`;
  });

  component.setEvent(() => {
    const { addItem } = $props;
    component.addEvent('keyup', '.appender', ({ key, target }) => {
      if (key !== 'Enter') return;
      addItem(target.value);
    });
  });
};

export default ItemAppender;
