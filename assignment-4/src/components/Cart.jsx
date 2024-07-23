import React from "react";
import './Cart.css';

const Cart = ({ cartItem, clearCart }) => {
  return (
    <div className="cart-page">
      <button onClick={clearCart} className="clear-button">Clear</button>
      <div className="cart-items">
        {cartItem.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.imageSrc} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-price">${item.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;