// import { useState } from "react";
import PropTypes from "prop-types";

const Categories = ({ categoryId, setCategoryId }) => {
  const categoriesList = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  // const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="categories">
      <ul>
        {categoriesList.map((categoryName, index) => {
          return (
            <li
              onClick={() => setCategoryId(index)}
              key={categoryName}
              className={categoryId === index ? "active" : ""}
            >
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Categories.propTypes = {
  categoryId: PropTypes.number.isRequired,
  setCategoryId: PropTypes.func.isRequired,
};

export default Categories;
