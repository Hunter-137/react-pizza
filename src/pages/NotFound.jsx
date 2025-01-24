import { Link } from "react-router";
import NotFoundBlock from "../components/NotFoundBlock";

const NotFound = () => {
  return (
    <>
      <NotFoundBlock />
      <Link to="/">
        <button className='button'>На главную страницу</button>
      </Link>
    </>
  );
};

export default NotFound;
