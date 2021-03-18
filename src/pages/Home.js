import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Categories from '../components/Categories';
import LoadingBlock from '../components/LoadingBlock';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/Pizza-block';
import SortPopup from '../components/SortPopup';
import { addPizzaToCart } from '../redux/actions/cart';
import { setCategory, setSortBy } from '../redux/actions/filters';
import { fetchPizzas, setCurrentPage } from '../redux/actions/pizzas';

const categoryNames = ['Classics', 'Meat', 'Vegan', 'Hot', 'Grill'];
const sortItems = [
  { name: 'Popular', type: 'rating', order: 'desc' },
  { name: 'Price', type: 'price', order: 'desc' },
  { name: 'abc', type: 'name', order: 'asc' },
];

const Home = () => {
  const dispatch = useDispatch();
  const { items, isLoading, pageLimit, currentPage, amountPages } = useSelector(
    (state) => ({
      items: state.pizzas.items,
      isLoading: state.pizzas.isLoading,
      amountPages: state.pizzas.amountPages,
      currentPage: state.pizzas.currentPage,
      pageLimit: state.pizzas.pageLimit,
    })
  );
  const cartItems = useSelector(({ cart }) => cart.items);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  React.useEffect(() => {
    dispatch(fetchPizzas(category, sortBy, pageLimit, currentPage));
  }, [category, sortBy, pageLimit, currentPage, dispatch]);

  const onSelectCategory = React.useCallback(
    (index) => {
      dispatch(setCategory(index));
      dispatch(setCurrentPage(1));
    },
    [dispatch]
  );

  const onSelectSortBy = React.useCallback(
    (name) => {
      dispatch(setSortBy(name));
      dispatch(setCurrentPage(1));
    },
    [dispatch]
  );
  const onSelectPage = React.useCallback(
    (e, page) => {
      e.preventDefault();
      dispatch(setCurrentPage(page));
    },
    [dispatch]
  );
  const onClickAddToCart = (pizzaObj) => {
    dispatch(addPizzaToCart(pizzaObj));
  };
  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          onClickCategory={onSelectCategory}
          activeCategory={category}
          items={categoryNames}
        />
        <SortPopup
          onClickSortByName={onSelectSortBy}
          activeSortType={sortBy.type}
          items={sortItems}
        />
      </div>

      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {/* {items &&
          items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)} */}
        {isLoading
          ? Array(pageLimit)
              .fill()
              .map((_, index) => (
                <span key={index}>
                  <LoadingBlock />
                </span>
              ))
          : items.map((pizza) => (
              <PizzaBlock
                addToCart={(pizzaObj) => onClickAddToCart(pizzaObj)}
                key={pizza.id}
                addedCount={
                  cartItems[pizza.id] && cartItems[pizza.id].items.length
                }
                {...pizza}
              />
            ))}
      </div>
      {/* Small Pagination */}
      <Pagination
        currentPage={currentPage}
        amountPages={amountPages}
        onClickPages={onSelectPage}
      />
    </div>
  );
};

export default Home;
