import { useState } from "react";
import ImageSlider from "./Slider/Slider";
import Categories from "./Categories/Categories";
import HomeProducts from "./HomeProducts/HomeProducts";

const Home = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  return (
    <>
      <ImageSlider />
      <Categories setSelectedCategoryId={setSelectedCategoryId} />
      <HomeProducts categoryId={selectedCategoryId} />
    </>
  );
};

export default Home;
