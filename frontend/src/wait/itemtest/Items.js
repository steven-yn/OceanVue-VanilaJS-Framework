import Component from '../core/Component';

const Items = function ($target, $props) {
  const component = new Component($target, $props);
  // 초기 상태 입력.

  console.log($target);
  console.log($props);

  //component.setup((component.$state = { items: ['item1', 'item2'] }));
  component.templete(() => {
    const { filteredItems } = $props;
    return `
    <ul>
      ${filteredItems()
        .map(
          ({ contents, active, seq }) => `
        <li data-seq="${seq}">
          ${contents}
          <button class="toggleBtn" style="color: ${active ? '#09F' : '#F09'}">
            ${active ? '활성' : '비활성'}
          </button>
          <button class="deleteBtn">삭제</button>
        </li>
      `,
        )
        .join('')}
    </ul>
  `;
  });
  component.setEvent(() => {
    const { deleteItem, toggleItem } = $props;

    component.addEvent('click', '.deleteBtn', ({ target }) => {
      deleteItem(Number(target.closest('[data-seq]').dataset.seq));
    });

    component.addEvent('click', '.toggleBtn', ({ target }) => {
      toggleItem(Number(target.closest('[data-seq]').dataset.seq));
    });
  });
};

export default Items;

/*
const $app = document.querySelector('#PostItemBlock');

  let state = {
    items: ['item1', 'item2', 'item3', 'item4'],
  };

  const stateRender = () => {
    const { items } = state;

    $app.innerHTML = `
      <ul>
        ${items.map((item) => `<li>${item}</li>`).join('')}
      </ul>
      <button id="append">추가</button>
    `;

    document.querySelector('#append').addEventListener('click', () => {
      setState({ items: [...items, `item${items.length + 1}`] });
    });
  };

  const setState = (newState) => {
    state = { ...state, ...newState };
    stateRender();
  };

  stateRender();
  */
