// import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="259" rx="10" ry="10" width="280" height="27" />
    <rect x="0" y="308" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="420" rx="10" ry="10" width="95" height="27" />
    <circle cx="140" cy="127" r="115" />
    <rect x="121" y="410" rx="10" ry="10" width="155" height="45" />
  </ContentLoader>
);

export default Skeleton;
