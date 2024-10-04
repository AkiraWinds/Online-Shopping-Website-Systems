import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../Home/UserContext";
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

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { basketId } = useAuth(); // 在组件主体内调用useAuth

  useEffect(() => {
    // fetch a Product
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/products/${productId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError("Error fetching product");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  // add to cart
  const handleAddToCart = async () => {
    if (!product) return;

    if (product.sizes.length > 0 && !selectedSize) {
      alert("Please select a size.");
      return;
    }

    const item = {
      productKey:
        product.sizes.length > 0
          ? `${product.productId}_${selectedSize}`
          : `${product.productId}`,
      productId: product.productId,
      size: selectedSize,
      name: product.productName,
      quantity: quantity,
      price: product.discountPrice ? product.discountPrice : product.price,
      image: product.image,
    };

    try {
      const response = await fetch(
        `http://localhost:8000/basket/${basketId}/items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      alert("Item added to cart successfully");
    } catch (error) {
      alert("Error adding item to cart");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>No product found.</p>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <div
            id="productCarousel"
            className="carousel slide"
            data-ride="carousel"
          >
            <ul className="carousel-indicators">
              <li
                data-target="#productCarousel"
                data-slide-to={0}
                className="active"
              ></li>
            </ul>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={product.image}
                  alt={product.productName}
                  className="d-block w-100"
                />
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#productCarousel"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#productCarousel"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="product-details">
            <h1>{product.productName}</h1>
            <p className="price">
              {product.discountPrice ? (
                <>
                  <span className="original-price">
                    {product.price} {product.currency}
                  </span>
                  <span className="current-price">
                    {product.discountPrice} {product.currency}
                  </span>
                </>
              ) : (
                <span className="current-price">
                  {product.price} {product.currency}
                </span>
              )}
            </p>
            <div className="product-options">
              {product.sizes.length > 0 && (
                <div className="sizes">
                  <span>Size:</span>
                  {product.sizes.map((size) => (
                    <label key={size} htmlFor={`size-${size.toLowerCase()}`}>
                      {size}
                      <input
                        type="radio"
                        id={`size-${size.toLowerCase()}`}
                        name="size"
                        value={size}
                        onChange={(e) => setSelectedSize(e.target.value)}
                      />
                    </label>
                  ))}
                </div>
              )}
              <div className="quantity">
                <span>Quantity:</span>
                <select
                  id="quantity-select"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                >
                  {[...Array(9).keys()].map((_, index) => (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button className="add-to-cart" onClick={handleAddToCart}>
              Add to cart
            </button>
            <p className="product-description">Product Description:</p>
            <ul>
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
