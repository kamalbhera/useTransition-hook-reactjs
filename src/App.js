import { useState, useTransition, Suspense} from 'react';
import logo from './logo.svg';
import './App.css';
import ProductList from './ProductList';
import { generateProducts } from './data';

const dummyProducts = generateProducts();
function filterProducts(filterTerm) {
  if (!filterTerm) {
    return dummyProducts;
  }
  return dummyProducts.filter((product) => product.includes(filterTerm));
}

function App() {
  const [isPending, startTransaction] = useTransition();
  const [filterTerm, setFilterTerm] = useState('');

  const filteredProducts = filterProducts(filterTerm);

  function updateFilterHandler(event) {
    startTransaction(() => {
      setFilterTerm(event.target.value);
    });
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <form>
          <label>
            Search Name:
            <input type="text" onChange={updateFilterHandler} />
          </label>
          {isPending && <p style={{ color: 'white' }}>Updating list ...</p>}
          <Suspense fallback={<h2>Loading...</h2>}>
            <ProductList products={filteredProducts} />
          </Suspense>
        </form>
      </header>
    </div>
  );
}

export default App;
