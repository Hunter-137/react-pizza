import { useEffect, useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import qs from "qs";

import {
  setCatedoryId,
  setSortType,
  setCurrentPage,
  setFilter,
} from "../redux/slices/filterSlice";
import { fetchPizza } from "../redux/slices/pizzaSlice";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import sortList from "../components/Sort/sortList";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import SearchValueContext from "../context/SearchValueContext";
import FailedPizzasFetch from "../components/FailedPizzasFetch";

const Home = () => {
  const { searchValue } = useContext(SearchValueContext);
  const { items, status } = useSelector((state) => state.pizzaSlice);
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

  const getPizzas = async () => {
    dispatch(
      fetchPizza({
        sort,
        order,
        category,
        search,
        currentPage,
      })
    );
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
      getPizzas();
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
      {status === "failed" ? (
        <FailedPizzasFetch />
      ) : (
        <div className="content__items">
          {status === "success" ? pizzas : skeletons}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        onChangePage={(pageNumber) => dispatch(setCurrentPage(pageNumber))}
      />
    </>
  );
};

export default Home;
