import { useState, useEffect } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState(0);

  // console.log(categoryId);
  // console.log(sortType);

  useEffect(() => {
    async function fetchData() {
      try {
        const link =
          categoryId === 0
            ? `https://6790ae6caf8442fd73773b6f.mockapi.io/items`
            : `https://6790ae6caf8442fd73773b6f.mockapi.io/items?category=${categoryId}`;
        window.scrollTo(0, 0);
        setIsLoading(true);
        const response = await fetch(link);
        const result = await response.json();
        setItems(result);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [categoryId]);

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} setCategoryId={setCategoryId} />
        <Sort sortType={sortType} setSortType={setSortType} />
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
