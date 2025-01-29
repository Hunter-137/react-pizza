import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

const Home = ({ searchValue }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "популярности (возрастание)",
    sortProperty: "rating",
  });

  const sort = sortType.sortProperty.replace("-", "");
  const order = sortType.sortProperty.includes("-")
    ? "order=asc"
    : "order=desc";
  const category = categoryId > 0 ? `category=${categoryId}` : "";

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        window.scrollTo(0, 0);
        const response = await fetch(
          `https://6790ae6caf8442fd73773b6f.mockapi.io/items?sortBy=${sort}&${order}&${category}`
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

  const skeletons = [...new Array(10)].map((skeleton, index) => {
    return <Skeleton key={index} />;
  });

  const pizzas = items
    .filter((obj) =>
      obj.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

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
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
    </>
  );
};

Home.propTypes = {
  searchValue: PropTypes.string.isRequired,
};

export default Home;
