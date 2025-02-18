import PropTypes from "prop-types"; // временная заглушка для параметров (ругается линтер)
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItems, selectCartSlice } from "../../redux/slices/cartSlice";
import { Link } from "react-router";

const typeNames = ["тонкое", "традиционное"];

const PizzaBlock = ({ id, title, price, imageUrl, sizes, types }) => {
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const dispatch = useDispatch();
  const { items } = useSelector(selectCartSlice);
  const addedPizzasCount = items
    .filter((obj) => obj.id === id)
    .reduce((acc, obj) => {
      if (obj.count > 0) {
        acc += obj.count;
      }
      return acc;
    }, 0);

  const onAddPizza = () => {
    dispatch(
      setItems({
        id,
        title,
        price,
        imageUrl,
        size: sizes[activeSize],
        type: typeNames[activeType],
        count: 1,
      })
    );
  };

  return (
    <div className="pizza-block">
      <Link to={`pizza/${id}`}>
        <img className="pizza-block__image info-ref" src={imageUrl} alt="Pizza" />
      </Link>
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((typeId, index) => {
            return (
              <li
                key={`${title} + ${typeNames[typeId]}`}
                className={activeType === index ? "active" : ""}
                onClick={() => setActiveType(index)}
              >
                {typeNames[typeId]}
              </li>
            );
          })}
        </ul>
        <ul>
          {sizes.map((size, index) => {
            return (
              <li
                key={`${title} + ${size}`}
                className={activeSize === index ? "active" : ""}
                onClick={() => setActiveSize(index)}
              >
                {size} см.
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button
          className="button button--outline button--add"
          onClick={() => onAddPizza()}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedPizzasCount > 0 && <i>{addedPizzasCount}</i>}
        </button>
      </div>
    </div>
  );
};

// временная заглушка для параметров (ругается линтер)
PizzaBlock.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  sizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  types: PropTypes.arrayOf(PropTypes.number).isRequired,
};
// временная заглушка для параметров (ругается линтер)

export default PizzaBlock;
