const FailedPizzasFetch = () => {
  return (
    <div className="content__error">
      <h2 className="content__error-title">Произошла ошибка! 😕</h2>
      <p className="content__error-text">
        К сожалению, не удалось получить пиццы. Попробуйте повторить попытку
        позже...
      </p>
    </div>
  );
};

export default FailedPizzasFetch;
