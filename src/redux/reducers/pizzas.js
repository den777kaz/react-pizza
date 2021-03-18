import {
  SET_LOADED,
  SET_PIZZAS,
  SET_PIZZAS_TOTAL_COUNT,
  SET_CURRENT_PAGE,
} from '../actions/pizzas';

const currentPage = 1;
const pageLimit = 4;

const iniatialState = {
  items: [],
  isLoading: false,
  currentPage: currentPage,
  pageLimit: pageLimit,
  amountPages: null,
  totalCount: null,
};
const pizzas = (state = iniatialState, action) => {
  switch (action.type) {
    case SET_PIZZAS:
      return {
        ...state,
        items: action.payload,
        isLoading: false,
      };
    case SET_LOADED:
      return { ...state, isLoading: action.payload };
    case SET_PIZZAS_TOTAL_COUNT:
      return {
        ...state,
        totalCount: action.payload,
        amountPages: Math.ceil(action.payload / pageLimit),
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};

export default pizzas;
