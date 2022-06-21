const ORDERS_FETCHED = "ORDERS_FETCHED";

const ordersFetched = () => {
  return {
    type: ORDERS_FETCHED,
  };
};

export const setFetched = () => (dispatch) => {
  dispatch(ordersFetched());
};

export default function (state = "", action) {
  switch (action.type) {
    case ORDERS_FETCHED:
      return ORDERS_FETCHED;
    default:
      return state;
  }
}
