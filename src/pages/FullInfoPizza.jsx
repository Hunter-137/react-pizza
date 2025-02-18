// import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import NotFound from "./NotFound";

const FullInfoPizza = () => {
  const { id } = useParams();
  const [pizzaData, setPizzaData] = useState();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get(
          `https://6790ae6caf8442fd73773b6f.mockapi.io/items/${id}`
        );
        setPizzaData(data);
        setStatus("success");
      } catch (error) {
        console.error(error);
        setStatus("failed");
      }
    };
    fetchPizza();
  }, [id]);

  if (status === "loading") {
    return (
      <div className="full-info-pizza__loading">
        <h2>Идёт загрузка...</h2>
      </div>
    );
  }

  if (status === "failed") {
    return <NotFound />;
  }

  return (
    <>
      <div className="full-info-pizza">
        <h2 className="full-info-pizza__title">{pizzaData.title}</h2>
        <img
          className="full-info-pizza__img"
          src={pizzaData.imageUrl}
          alt="pizza img"
        />
        <p className="full-info-pizza__price">от {pizzaData.price} ₽</p>
      </div>
      <Link to="/">
        <button className="button">На главную страницу</button>
      </Link>
    </>
  );
};

export default FullInfoPizza;
