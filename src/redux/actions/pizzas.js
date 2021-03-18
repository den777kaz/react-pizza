import axios from 'axios';

export const SET_LOADED = 'SET_LOADED';
export const SET_PIZZAS = 'SET_PIZZAS';
export const SET_PIZZAS_TOTAL_COUNT = 'SET_PIZZAS_TOTAL_COUNT';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

// const baseUrl = 'http://localhost:3001/pizzas?';
const baseUrl = 'https://react-pizza-backend.herokuapp.com/pizzas?';

export const fetchPizzas = (
  category,
  sortBy,
  pageLimit = 4,
  currentPage = 1
) => (dispatch) => {
  dispatch(setLoaded(true));
  axios
    .get(
      `${baseUrl}${category !== null ? `category=${category}` : ''}&_sort=${
        sortBy.type
      }&_order=${sortBy.order}&_page=${currentPage}&_limit=${pageLimit}`
    )
    .then((res) => {
      dispatch(setPizzas(res.data));
      dispatch(setPizzasTotalCount(res.headers['x-total-count']));
      // dispatch(setLoaded(false));
    })
    .catch((err) => console.log(err));
};

const setLoaded = (payload) => ({
  type: SET_LOADED,
  payload,
});

const setPizzas = (items) => ({
  type: SET_PIZZAS,
  payload: items,
});

const setPizzasTotalCount = (totalCount) => ({
  type: SET_PIZZAS_TOTAL_COUNT,
  payload: totalCount,
});

export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  payload: currentPage,
});
