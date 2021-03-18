import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import { addPizzaFromLocalStorage } from './redux/actions/cart';

function App() {
  const dispatch = useDispatch();
  const cartFromLocarStorage = JSON.parse(localStorage.getItem('cart'));

  useEffect(() => {
    if (cartFromLocarStorage !== null) {
      dispatch(addPizzaFromLocalStorage(cartFromLocarStorage));
    }
  }, []);

  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/cart' component={Cart} exact />
      </div>
    </div>
  );
}

export default App;

// function App({ items, setPizzas }) {
//   useEffect(() => {
//     axios
//       .get('http://localhost:3000/db.json')
//       .then(({ data }) => setPizzas(data.pizzas));

//     // fetch('http://localhost:3000/db.json')
//     //   .then((response) => response.json())
//     //   .then((data) => setPizzas(data.pizzas));
//   }, []);

//   return (
//     <div className='wrapper'>
//       <Header />
//       <div className='content'>
//         <Route path='/' render={() => <Home items={items} />} exact />
//         <Route path='/cart' component={Cart} exact />
//       </div>
//     </div>
//   );
// }
// const mapStateToProps = (state) => ({
//   items: state.pizzas.items,
// });
// const mapDispatchToProps = {
//   setPizzas,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(App);
