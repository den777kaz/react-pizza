import {
  SET_TOTAL_PRICE,
  SET_TOTAL_COUNT,
  ADD_PIZZA_CART,
  CLEAR_CART,
  ADD_TO_STORAGE,
  REMOVE_CART_ITEM,
  MINUS_CART_ITEM,
  PLUS_CART_ITEM,
} from '../actions/cart';

const iniatialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);

const cart = (state = iniatialState, action) => {
  switch (action.type) {
    case ADD_PIZZA_CART: {
      const currentPizzaItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems),
        },
      };
      // TODO need refactoring
      const totalCount = Object.keys(newItems).reduce(
        (sum, key) => newItems[key].items.length + sum,
        0
      );
      const totalPrice = Object.keys(newItems).reduce(
        (sum, key) => newItems[key].totalPrice + sum,
        0
      );
      // const items = Object.values(newItems).map((obj) => obj.items);
      // const allpizzas = [].concat.apply([], items);
      // const Allpizzas = Object.values(newItems).flat();
      // const totalPrice = getTotalPrice(allpizzas);

      const cart = {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };

      localStorage.setItem('cart', JSON.stringify(cart));
      return cart;
    }

    case ADD_TO_STORAGE:
      return { ...action.payload };

    case CLEAR_CART: {
      localStorage.clear('cart');
      return {
        ...state,
        items: {},
        totalPrice: 0,
        totalCount: 0,
      };
    }

    case REMOVE_CART_ITEM: {
      const newItems = { ...state.items };
      const currentTotalPrice = newItems[action.payload].totalPrice;
      const currentTotalCount = newItems[action.payload].items.length;
      delete newItems[action.payload];
      const cart = {
        ...state,
        items: newItems,
        totalPrice: state.totalPrice - currentTotalPrice,
        totalCount: state.totalCount - currentTotalCount,
      };
      localStorage.setItem('cart', JSON.stringify(cart));
      return cart;
    }

    case SET_TOTAL_PRICE:
      return { ...state, totalPrice: action.payload };

    case SET_TOTAL_COUNT:
      return { ...state, totalCount: action.payload };

    case PLUS_CART_ITEM: {
      const newObjItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ];
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };
      // TODO need refactoring
      const totalCount = Object.keys(newItems).reduce(
        (sum, key) => newItems[key].items.length + sum,
        0
      );

      const totalPrice = Object.keys(newItems).reduce(
        (sum, key) => newItems[key].totalPrice + sum,
        0
      );

      const cart = {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };

      localStorage.setItem('cart', JSON.stringify(cart));
      return cart;
    }

    case MINUS_CART_ITEM: {
      const oldItems = state.items[action.payload].items;
      const newObjItems =
        oldItems.length > 1
          ? state.items[action.payload].items.slice(1)
          : oldItems;

      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };

      // TODO need refactoring
      const totalCount = Object.keys(newItems).reduce(
        (sum, key) => newItems[key].items.length + sum,
        0
      );
      const totalPrice = Object.keys(newItems).reduce(
        (sum, key) => newItems[key].totalPrice + sum,
        0
      );
      const cart = {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };

      localStorage.setItem('cart', JSON.stringify(cart));
      return cart;
    }

    default:
      return state;
  }
};

export default cart;
