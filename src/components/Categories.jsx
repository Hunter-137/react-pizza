import { useState } from "react";

function Categories() {
  const categoriesList = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="categories">
      <ul>
        {categoriesList.map((categoryName, index) => {
          return (
            <li
              onClick={() => setActiveIndex(index)}
              key={categoryName}
              className={activeIndex === index ? "active" : ""}
            >
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
