import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Filters from "./Filters";
import styles from "./Shopping.module.css";

interface Product {
  productId: string;
  productName: string;
  price: number;
  discountPrice?: number;
  currency: string;
  category: string;
  sizes: string[];
  image: string;
  description: string[];
  url: string;
}

const Shopping: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryFilter, setCategoryFilter] =
    useState<string>("All Categories");
  const [priceFilter, setPriceFilter] = useState<string>("All Prices");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Fetching products with filters:", {
      categoryFilter,
      priceFilter,
    });

    // url: all products / filtered products
    const url = new URL("http://localhost:8000/products");
    if (categoryFilter && categoryFilter !== "All Categories") {
      url.searchParams.append("category", categoryFilter);
    }

    if (priceFilter && priceFilter !== "All Prices") {
      const [minPrice, maxPrice] = priceFilter.split("-");
      if (minPrice) {
        url.searchParams.append("minPrice", minPrice);
      }
      if (maxPrice) {
        url.searchParams.append("maxPrice", maxPrice);
      }
    }
    console.log("Request URL:", url.toString());

    // get all products / filtered products
    fetch(url.toString())
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data);
        setProducts(data.products || data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Error fetching products");
      });
  }, [categoryFilter, priceFilter]);

  return (
    <div>
      <Filters
        onCategoryChange={setCategoryFilter}
        onPriceChange={setPriceFilter}
      />
      {error && <div className="error">{error}</div>}
      <div className={styles.container}>
        {products.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shopping;
