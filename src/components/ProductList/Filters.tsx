import React, { useState, useEffect } from "react";
import styles from "./Shopping.module.css";

console.log("Shopping.css loaded in FilterBar");

interface FiltersProps {
  onCategoryChange: (category: string) => void;
  onPriceChange: (priceRange: string) => void;
}

// Category Filter component
const CategoryFilter: React.FC<{
  onCategoryChange: (category: string) => void; //prop
}> = ({ onCategoryChange }) => {
  //function
  //callback function
  const [categories, setCategories] = useState<
    { name: string; value: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = new URL("http://localhost:8000/products/categories");

    //fetch filters function
    const fetchFilters = async () => {
      try {
        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error(
            `Network response was not ok, status: ${response.status}`
          );
        }
        const data = await response.json();
        console.log("Data received:", data);
        if (data.categories && Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else {
          throw new Error("Expected data.categories to be an array");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products");
      }
    };

    fetchFilters();
  }, []);

  return (
    <div>
      {error && <p className={styles.error}>{error}</p>}
      <select
        onChange={(e) => {
          console.log("Selected category value:", e.target.value);
          onCategoryChange(e.target.value);
        }}
        className={styles.dropdown}
      >
        {categories.map((category) => (
          <option
            className={styles.options}
            key={category.value}
            value={category.value}
          >
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

//Price Filter component
const PriceFilter: React.FC<{
  onPriceChange: (priceRange: string) => void;
}> = ({ onPriceChange }) => {
  const [prices, setPrices] = useState<{ name: string; value: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = new URL("http://localhost:8000/products/categories");
    const fetchFilters = async () => {
      try {
        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error(
            `Network response was not ok, status: ${response.status}`
          );
        }
        const data = await response.json();
        console.log("Data received for prices:", data);
        if (data.prices && Array.isArray(data.prices)) {
          setPrices(data.prices);
        } else {
          throw new Error("Expected data.prices to be an array");
        }
      } catch (error) {
        console.error("Error fetching prices:", error);
        setError("Error fetching prices");
      }
    };

    fetchFilters();
  }, []);

  return (
    <div>
      {error && <p className={styles.error}>{error}</p>}
      <select
        onChange={(e) => onPriceChange(e.target.value)}
        className={styles.dropdown}
      >
        {prices.map((price) => (
          <option
            key={price.value}
            value={price.value}
            className={styles.options}
          >
            {price.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const FilterBar: React.FC<FiltersProps> = ({
  onCategoryChange,
  onPriceChange,
}) => {
  return (
    <div className={styles.filterBar}>
      <CategoryFilter onCategoryChange={onCategoryChange} />
      <PriceFilter onPriceChange={onPriceChange} />
    </div>
  );
};

export default FilterBar;
