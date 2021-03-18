export const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
export const SET_TOTAL_PRICE = 'SET_TOTAL_PRICE';
export const ADD_PIZZA_CART = 'ADD_PIZZA_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
export const PLUS_CART_ITEM = 'PLUS_CART_ITEM';
export const MINUS_CART_ITEM = 'MINUS_CART_ITEM';
export const ADD_TO_STORAGE = 'ADD_TO_STORAGE';

export const addPizzaToCart = (pizzaObj) => ({
  type: ADD_PIZZA_CART,
  payload: pizzaObj,
});
export const addPizzaFromLocalStorage = (pizzaObj) => ({
  type: ADD_TO_STORAGE,
  payload: pizzaObj,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const removeCartItem = (id) => ({
  type: REMOVE_CART_ITEM,
  payload: id,
});

export const plusCartItem = (id) => ({
  type: PLUS_CART_ITEM,
  payload: id,
});

export const minusCartItem = (id) => ({
  type: MINUS_CART_ITEM,
  payload: id,
});
