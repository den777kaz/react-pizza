import { combineReducers } from 'redux';
import filtersReducer from './filters';
import pizzas from './pizzas';
import cart from './cart';

const rootReducer = combineReducers({
  pizzas,
  filters: filtersReducer,
  cart,
});

export default rootReducer;
