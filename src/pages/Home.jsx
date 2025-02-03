import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setCatedoryId } from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import SearchValueContext from "../context/SearchValueContext";

const Home = () => {
  const { searchValue } = useContext(SearchValueContext);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const categoryId = useSelector((state) => state.filterSlice.categoryId);
  const dispatch = useDispatch();

  const onChangeCategory = (id) => {
    dispatch(setCatedoryId(id));
  };

  const [sortType, setSortType] = useState({
    name: "популярности (возрастание)",
    sortProperty: "rating",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const sort = sortType.sortProperty.replace("-", "");
  const order = sortType.sortProperty.includes("-")
    ? "order=asc"
    : "order=desc";
  const category = categoryId > 0 ? `category=${categoryId}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        window.scrollTo(0, 0);
        const response = await fetch(
          `https://6790ae6caf8442fd73773b6f.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${sort}&${order}&${category}${search}`
        );
        const result = await response.json();
        setItems(result);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [categoryId, sortType, searchValue, currentPage]);

  const skeletons = [...new Array(4)].map((skeleton, index) => {
    return <Skeleton key={index} />;
  });

  const pizzas = items
    // .filter((obj) =>
    //   obj.title.toLowerCase().includes(searchValue.toLowerCase())
    // )
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <>
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(id) => onChangeCategory(id)}
        />
        <Sort value={sortType} onChangeSort={(type) => setSortType(type)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(pageNumber) => setCurrentPage(pageNumber)} />
    </>
  );
};

export default Home;
