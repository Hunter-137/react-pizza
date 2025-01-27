import { useState, useEffect } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        window.scrollTo(0, 0);
        const response = await fetch(
          `https://6790ae6caf8442fd73773b6f.mockapi.io/items?sortBy=${
            sortType.sortProperty
          }&order=desc&${categoryId > 0 ? `category=${categoryId}` : ""}`
        );
        const result = await response.json();
        setItems(result);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [categoryId, sortType]);

  return (
    <>
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(id) => setCategoryId(id)}
        />
        <Sort value={sortType} onChangeSort={(type) => setSortType(type)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(10)].map((skeleton, index) => {
              return <Skeleton key={index} />;
            })
          : items.map((obj) => {
              return <PizzaBlock key={obj.id} {...obj} />;
            })}
      </div>
    </>
  );
};

export default Home;
