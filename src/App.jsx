import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import Skeleton from "./components/PizzaBlock/Skeleton";

import "./scss/app.scss";
import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://6790ae6caf8442fd73773b6f.mockapi.io/items"
        );
        const result = await response.json();
        setItems(result);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(6)].map((skeleton, index) => {
                  return <Skeleton key={index} />;
                })
              : items.map((obj) => {
                  return <PizzaBlock key={obj.id} {...obj} />;
                })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
