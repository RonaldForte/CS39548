import React from "react";

const NavBar = ({ setCurrentPage, cartItem, setCartItem, clearCart }) => {
  const handleMenuOnClick = () => {
    setCurrentPage("menu");
  };

  const handleCartOnClick = () => {
    setCurrentPage("cart");
  };


  const addRandomFood = () => {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((res) => res.json())
      .then((data) => {
        const newRandomFood ={
          name: data.meals[0].strMeal,
          imageSrc: data.meals[0].strMealThumb,
          price: (Math.random() * (5 - 1) + 1).toFixed(2), // Generate a random price $1-5 here
        };
        setCartItem([...cartItem, newRandomFood]);
      })
  }

  const addRandomDrink =() => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
      .then((res) => res.json())
      .then((data) => {
        const newRandomDrink = {
          name: data.drinks[0].strDrink,
          imageSrc: data.drinks[0].strDrinkThumb,
          price: (Math.random() * (5 - 1) + 1).toFixed(2), // Generate a random price $1-5 here
        };
        setCartItem([...cartItem, newRandomDrink]);
      })
  }
  return (
    <div id="nav-bar">
      <div id='random-nav'>
        <div onClick={addRandomFood}>Add Random Food</div>
        <div onClick={addRandomDrink}>Add Random Drink</div>
      </div>
      <div id='page-nav'>
        <div onClick={handleMenuOnClick}>Menu</div>
        <div onClick={handleCartOnClick}>Cart ({cartItem.length} items in cart)</div> 
      </div>
    </div>
  )
}

export default NavBar;