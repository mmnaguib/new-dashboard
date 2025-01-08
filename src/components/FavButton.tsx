import React, { useState, useEffect } from "react";

const FavoriteButton = ({ productId }: { productId: number }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const getFavorites = (): number[] => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    return favorites.map((id: string) => parseInt(id, 10));
  };

  const saveFavorites = (favorites: number[]) => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  useEffect(() => {
    const favorites = getFavorites();
    setIsFavorite(favorites.includes(productId));
  }, [productId]);

  const toggleFavorite = () => {
    let favorites = getFavorites();
    if (favorites.includes(productId)) {
      favorites = favorites.filter((id) => id !== productId);
      saveFavorites(favorites);
      setIsFavorite(false);
    } else {
      favorites = [...favorites, productId];
      saveFavorites(favorites);
      setIsFavorite(true);
    }
  };

  return (
    <span className="productFavroute" onClick={toggleFavorite}>
      <i
        className={isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart"}
        style={isFavorite ? { color: "#f00" } : {}}
      ></i>
    </span>
  );
};

export default FavoriteButton;
