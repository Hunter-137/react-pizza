import { Route, Routes } from "react-router";
import { useState } from "react";

import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import "./scss/app.scss";
import SearchValueContext from "./context/SearchValueContext";

import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./redux/slices/counterSlice";

function App() {
  const [searchValue, setSearchValue] = useState("");

  const count = useSelector((state) => state.blablabla.chislo);
  const dispatch = useDispatch();

  return (
    <div className="wrapper">
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>

      <SearchValueContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </SearchValueContext.Provider>
    </div>
  );
}

export default App;
