import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Shopping.module.css";
import { useAuth } from "../Home/UserContext";

interface Product {
  productId: string;
  productName: string;
  price: number;
  discountPrice?: number;
  currency: string;
  category: string;
  sizes?: string[];
  image: string;
  description: string[];
  url: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { basketId } = useAuth(); //used for 'add to cart'
  const generateId = (size: string) => `${product.productId}_${size}`; // generate id function

  // add to cart
  const handleAddToCart = async () => {
    // select size
    let size = "";
    if (product.sizes && product.sizes.length > 0) {
      const sizeElement = document.querySelector(
        //所有被选中的、name 属性等于 ${product.productId}_size 的 <input> 元素
        `input[name='${product.productId}_size']:checked`
      ) as HTMLInputElement | null;
      if (!sizeElement) {
        showNotification("Please select a size.");
        return;
      }
      size = sizeElement.value;
    }

    const item = {
      quantity: 1,
      productKey: `${product.productId}_${size}`,
      productId: product.productId,
      size: size,
      name: product.productName,
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

      showNotification("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      showNotification("Error adding to cart.");
    }
  };

  // Notification
  const showNotification = (message: string) => {
    const notification = document.createElement("div");
    notification.classList.add(styles.notification);
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 2000);
  };

  return (
    <div className={styles.card}>
      <NavLink to={`/products/${product.productId}`}>
        <img
          src={product.image}
          alt={product.productName}
          className={styles["product-img"]}
        />
        <h5 className={styles["product-name"]}>{product.productName}</h5>
      </NavLink>
      <div className={styles["card-body"]}>
        {/* Render size selection only if sizes are available */}
        {product.sizes && product.sizes.length > 0 && (
          <div className={styles.sizes}>
            <span>Size:</span>
            {product.sizes.map((size) => (
              // map every sizes and form them one by one
              <label key={generateId(size)} htmlFor={generateId(size)}>
                <input
                  type="radio"
                  id={generateId(size)}
                  name={`${product.productId}_size`} // single selection
                  value={size}
                />
                {size}
              </label>
            ))}
          </div>
        )}
        <p className={styles["product-price"]}>
          {product.discountPrice ? (
            <>
              <span className={styles["discount-price"]}>
                {product.discountPrice} {product.currency}
              </span>
              &nbsp;
              <span className={styles["original-price"]}>
                {product.price} {product.currency}
              </span>
            </>
          ) : (
            <span>
              {product.price} {product.currency}
            </span>
          )}
        </p>
        <button className={styles["add-to-cart"]} onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
