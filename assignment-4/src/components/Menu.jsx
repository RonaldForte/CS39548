import React from 'react';
import { useState } from 'react';
import { MENU } from '../assets/data';

const Menu = ({ addToCart }) => {
  // Hint: Add an onClick handler to add each item to the cart
  const handleItemOnClick = (item) => {
    addToCart(item);
  };

  return (
    <div id='menu'>
      {MENU.map(item => (
        <div className='menu-item' key={item.name} onClick={() => handleItemOnClick(item)}>
          <img src={item.imageSrc} alt={item.name}/>
          <div>{item.name}</div>
          <div>${item.price}</div>
        </div>
      ))}
    </div>
  );
};

export default Menu;