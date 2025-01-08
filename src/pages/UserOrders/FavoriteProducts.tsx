import React, { useState, useEffect } from "react";
import axios from "axios";
import { IProductProps } from "../../interface";
import axiosInstance from "../../utils/AxiosInstance";

const FavoriteProducts: React.FC = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<IProductProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getFavoriteIds = (): number[] => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    return favorites.map((id: string) => parseInt(id, 10));
  };

  const fetchFavoriteProducts = async () => {
    try {
      const favoriteIds = getFavoriteIds();
      if (favoriteIds.length === 0) {
        setFavoriteProducts([]);
        setLoading(false);
        return;
      }

      const promises = favoriteIds.map((id) =>
        axiosInstance.get<IProductProps>(`Product/${id}`)
      );

      const responses = await Promise.all(promises);
      const products = responses.map((response) => response.data);
      setFavoriteProducts(products);
    } catch (error) {
      console.error("Error fetching favorite products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavoriteProducts();
  }, []);

  return (
    <div>
      <h1>Favorite Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : favoriteProducts.length > 0 ? (
        <ul>
          {favoriteProducts.map((product) => (
            <li key={product.id}>
              <img src={product.image} alt={product.title} width="100" />
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite products yet.</p>
      )}
    </div>
  );
};

export default FavoriteProducts;
