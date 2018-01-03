/*
{
  type: 'SOMECONST',
  payload: {
    data
  }
}
*/

const PRESS_NUM = 'PRESS_NUM';

// action
export const pressNum = n => ({
  type: PRESS_NUM,
  payload: n,
});

export const reducer = (state = '0', { type, payload }) => {
  switch (type) {
    case PRESS_NUM:
      return state + payload;
    default:
      return state;
  }
};
