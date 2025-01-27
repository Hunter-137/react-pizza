import PropTypes from "prop-types";

const Categories = ({ value, onChangeCategory }) => {
  const categoriesList = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categoriesList.map((categoryName, index) => {
          return (
            <li
              onClick={() => onChangeCategory(index)}
              key={categoryName}
              className={value === index ? "active" : ""}
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
  value: PropTypes.number.isRequired,
  onChangeCategory: PropTypes.func.isRequired,
};

export default Categories;
