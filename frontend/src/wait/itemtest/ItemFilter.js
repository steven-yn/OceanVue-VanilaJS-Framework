import Component from '../core/Component';

const ItemFilter = function ($target, $props) {
  const component = new Component($target, $props);

  console.log($target);
  console.log($props);

  component.templete(() => {
    return `
      <button class="filterBtn" data-is-filter="0">전체 보기</button>
      <button class="filterBtn" data-is-filter="1">활성 보기</button>
      <button class="filterBtn" data-is-filter="2">비활성 보기</button>
    `;
  });

  component.setEvent(() => {
    const { filterItem } = $props;
    component.addEvent('click', '.filterBtn', ({ target }) => {
      filterItem(Number(target.dataset.isFilter));
    });
  });

  //component($target, $props);
};

export default ItemFilter;
