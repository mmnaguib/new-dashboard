import React, { useState } from "react";
import ImageSlider from "./Slider/Slider";
import Categories from "./Categories/Categories";
import HomeProducts from "./HomeProducts/HomeProducts";

const Home = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  return (
    <div style={{ height: "5000px" }}>
      <ImageSlider />
      <Categories setSelectedCategoryId={setSelectedCategoryId} />
      <HomeProducts categoryId={selectedCategoryId} />
    </div>
  );
};

export default Home;
