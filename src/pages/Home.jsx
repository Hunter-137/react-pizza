import { useState, useEffect, useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import qs from "qs";

import {
  setCatedoryId,
  setSortType,
  setCurrentPage,
  setFilter,
} from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import sortList from "../components/Sort/sortList";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import SearchValueContext from "../context/SearchValueContext";

const Home = () => {
  const { searchValue } = useContext(SearchValueContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { categoryId, sortType, currentPage } = useSelector(
    (state) => state.filterSlice
  );
  const sortTypeProperty = sortType.sortProperty;
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeCategory = (id) => {
    dispatch(setCatedoryId(id));
  };

  const onChangeSort = (type) => {
    dispatch(setSortType(type));
  };

  const sort = sortTypeProperty.replace("-", "");
  const order = sortTypeProperty.includes("-") ? "order=asc" : "order=desc";
  const category = categoryId > 0 ? `category=${categoryId}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";

  const fetchPizzas = () => {
    axios
      .get(
        `https://6790ae6caf8442fd73773b6f.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${sort}&${order}&${category}${search}`
      )
      .then((response) => {
        setItems(response.data);
        setIsLoading(false);
      });
  };

  // Если был первый рендер, то нужно вшить сортировку в адресную строку
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        currentPage,
        sortTypeProperty,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sortTypeProperty, currentPage]);

  // Если был первый рендер и если в адресную строку вшита сортировка, то обнови данные в редаксе
  useEffect(() => {
    if (window.location.search) {
      const queryParsing = qs.parse(window.location.search.substring(1));
      const sortType = sortList.find(
        (obj) => obj.sortProperty === queryParsing.sortTypeProperty
      );

      dispatch(
        setFilter({
          ...queryParsing,
          sortType,
        })
      );

      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const skeletons = [...new Array(4)].map((skeleton, index) => {
    return <Skeleton key={index} />;
  });

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <>
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(id) => onChangeCategory(id)}
        />
        <Sort value={sortType} onChangeSort={(type) => onChangeSort(type)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination
        currentPage={currentPage}
        onChangePage={(pageNumber) => dispatch(setCurrentPage(pageNumber))}
      />
    </>
  );
};

export default Home;
