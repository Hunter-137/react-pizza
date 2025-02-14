import { Link } from "react-router";
import emptyCartImg from "../assets/img/empty-cart.png";

const CartEmpty = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>
          Корзина пустая <span>😕</span>
        </h2>
        <p>
          Вероятнее всего, вы ещё не заказали пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейдите на главную страницу.
        </p>
        <img src={emptyCartImg} alt="empty cart img" />
        <Link to="/" className="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
