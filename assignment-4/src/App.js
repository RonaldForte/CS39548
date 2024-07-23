import React, { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import Menu from "./components/Menu";
import { useRoutes } from "react-router-dom";

function App() {
  const [cartItem, setCartItem] = useState([]);
  const [currentPage, setCurrentPage] = useState("menu");

  const addToCart = (item) => {
    setCartItem([...cartItem, item]);
  };

  const clearCart = () => {
    setCartItem([]);
  };

  return (
    <div className="App">
      <NavBar
        setCurrentPage={setCurrentPage}
        cartItem={cartItem}
        setCartItem={setCartItem}
        clearCart={clearCart}
      />
      {currentPage === "menu" ? (
        <Menu addToCart={addToCart} />
      ) : (
        <Cart cartItem={cartItem} clearCart={clearCart} />
      )}
    </div>
  );
}

export default App;

