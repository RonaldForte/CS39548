/*
* Feel free to modify this file to your liking.
* */

// POS Data to help you get started, feel free to replace the pricing/naming or not use this altogether.
const POS_DATA = {
  foodItems: [
    { name: 'Fried Chicken', price: 7.99, imageSrc: './assets/img/food/food1.png' },
    { name: 'Garlic Chicken', price: 8.50, imageSrc: './assets/img/food/food2.png' },
    { name: 'Stir Fry Noodles', price: 5.00, imageSrc: './assets/img/food/food3.png' },
    { name: 'Hamburger', price: 6.00, imageSrc: './assets/img/food/food4.png' },
    { name: 'Taco', price: 3.99, imageSrc: './assets/img/food/food5.png' },
    { name: 'Salad', price: 4.59, imageSrc: './assets/img/food/food6.png' },
    { name: 'Chicken Rice', price: 7.25, imageSrc: './assets/img/food/food7.png' },
    { name: 'Shrimp', price: 5.00, imageSrc: './assets/img/food/food8.png' },
    { name: 'Avocado Toast', price: 3.75, imageSrc: './assets/img/food/food9.png' },
    { name: 'Beef Tartar', price: 4.50, imageSrc: './assets/img/food/food10.png' },
    { name: 'Edamame', price: 2.25, imageSrc: './assets/img/food/food11.png' },
    { name: 'Steak Sandwich', price: 8.00, imageSrc: './assets/img/food/food12.png' },
  ],
  drinkItems: [
    { name: 'Tequila Sunrise', price: 7.00, imageSrc: './assets/img/drinks/drink1.png' },
    { name: 'Old Fashion', price: 7.50, imageSrc: './assets/img/drinks/drink2.png' },
    { name: 'Blue Hawaii', price: 6.50, imageSrc: './assets/img/drinks/drink3.png' },
    { name: 'Gin and Tonic', price: 5.00, imageSrc: './assets/img/drinks/drink4.png' },
    { name: 'Margarita', price: 5.00, imageSrc: './assets/img/drinks/drink5.png' },
    { name: 'Coke', price: 1.75, imageSrc: './assets/img/drinks/drink6.png' },
    { name: 'Pepsi', price: 1.75, imageSrc: './assets/img/drinks/drink7.png' },
    { name: 'Sprite', price: 1.75, imageSrc: './assets/img/drinks/drink8.png' },
  ],
  dessertItems: [
    { name: 'Cheesecake', price: 4.99, imageSrc: './assets/img/dessert/dessert1.png' },
    { name: 'Creme Brule', price: 5.99, imageSrc: './assets/img/dessert/dessert2.png' },
    { name: 'Macaroon', price: 3.25, imageSrc: './assets/img/dessert/dessert3.png' },
    { name: 'Sundae', price: 4.50, imageSrc: './assets/img/dessert/dessert4.png' },
  ]
}

/*window.onload = () => {
  const inventory = document.getElementById('inventory');

  // Example code for adding a drink item to the inventory to demonstrate
  // the usage of document.createElement. This is not the ONLY way to use JS to add/create elements.
  const sampleDrinkData = POS_DATA.drinkItems[0];

  const sampleDrinkMenuItem = document.createElement('div');
  sampleDrinkMenuItem.className = 'menu-item';

  // This example also includes adding a click handler for the item.
  // Though, this is not the ONLY way to do so.
  sampleDrinkMenuItem.addEventListener('click', () => {
    alert('Clicked this drink!')
  })

  const sampleDrinkImage = document.createElement('img');
  sampleDrinkImage.className = 'item-image';
  sampleDrinkImage.src = sampleDrinkData.imageSrc;

  const sampleDrinkName = document.createElement('div');
  sampleDrinkName.className = 'item-name';
  sampleDrinkName.innerText = sampleDrinkData.name;

  const sampleDrinkPrice = document.createElement('div')
  sampleDrinkPrice.className = 'item-price';
  sampleDrinkPrice.innerText = '$' + sampleDrinkData.price;

  sampleDrinkMenuItem.appendChild(sampleDrinkImage);
  sampleDrinkMenuItem.appendChild(sampleDrinkName);
  sampleDrinkMenuItem.appendChild(sampleDrinkPrice);

  inventory.appendChild(sampleDrinkMenuItem)


  // Example for adding a dessert item, taking a different approach as above.
  const sampleDessertData = POS_DATA.dessertItems[0];

  const sampleDessertItem = document.createElement('div');
  sampleDessertItem.className = 'menu-item';

  sampleDessertItem.innerHTML = `
    <div class="menu-item">
        <img class="item-image" src="${sampleDessertData.imageSrc}"/>
        <div class="item-name">${sampleDessertData.name}</div>
        <div class="item-price">$${sampleDessertData.price}</div>
      </div>
  `;
  
  // Another example of adding a click handler for this item.
  sampleDessertItem.addEventListener('click', () => alert('Clicked this dessert!'))
  
  inventory.appendChild(sampleDessertItem);
}
*/

//my code lol
window.onload = () => {
  const inventory = document.getElementById('inventory');

  //making into menu items
  function createMenuItem(data) {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item';

    const itemImage = document.createElement('img');
    itemImage.className = 'item-image';
    itemImage.src = data.imageSrc;

    const itemName = document.createElement('div');
    itemName.className = 'item-name';
    itemName.innerText = data.name;

    const itemPrice = document.createElement('div');
    itemPrice.className = 'item-price';
    itemPrice.innerText = `$${data.price.toFixed(2)}`; //exactly 2 decimal cause js is stupid

    menuItem.appendChild(itemImage);
    menuItem.appendChild(itemName);
    menuItem.appendChild(itemPrice);

    //review adding functionality (event listener)
    menuItem.addEventListener('click', () => addItemToOrder(data)); //when it clicks data (specific menu item) will be called as a param for addItemToOrder
    //tomorrow implement addItemToOrder...shouldn't be too hard right? ahahaha...
    return menuItem;
  }

  //removing first fried chicken
  const receiptList = document.querySelector('.receipt-item-list');
  const firstReceiptItem = receiptList.firstElementChild;
  //this is from the default "fried chicken" in the reciept list from the html
  if (firstReceiptItem) { 
    receiptList.removeChild(firstReceiptItem);
  }
  //this is for the default image that pops up from the html
  const defaultFriedChicken = document.querySelector('#inventory .menu-item .item-name'); //selecting the god awful fried chicken
  if (defaultFriedChicken && defaultFriedChicken.innerText.trim() === 'Fried Chicken') {
    defaultFriedChicken.parentElement.remove();
  }

  //adding things to order list
  function addItemToOrder(item) {
    const orderListElement = document.querySelector('.receipt-item-list');
  
    //creating reciept item div
    const receiptItem = document.createElement('div');
    receiptItem.className = 'receipt-item';
  
    //inner html of reciept item div
    receiptItem.innerHTML = `
      <div>
      ${item.name} - $${item.price.toFixed(2)}
      </div>
      <button class="remove-button">
      X
      </button>
    `; //setting a class for the button "X" to remove-button. shows up once an added item is well added
  
    //adding reciept item to order list
    orderListElement.appendChild(receiptItem);
  
    //event listener for the X button
    const removeButton = receiptItem.querySelector('.remove-button');
    removeButton.addEventListener('click', () => removeItemFromOrder(receiptItem, item.price));
  
    //update total amount after every add
    updateTotalAmount(item.price);
  }

//the actual removing of the item from the reciept list
function removeItemFromOrder(receiptItem, itemPrice) {
  const orderListElement = document.querySelector('.receipt-item-list'); 

  orderListElement.removeChild(receiptItem); //removes the div

  updateTotalAmount(-itemPrice); //update total amount ater every move (subtracting the amount from total and setting it as that)
}

//the actual update totaling of the items
function updateTotalAmount(amount) {
  const totalAmountElement = document.getElementById('total-amount-text');
  let currentTotal = parseFloat(totalAmountElement.innerText.replace('Total: $', '')); //string to float. .replace adds the "Total: $"

  //calc to update total amount
  currentTotal += amount; //amount is passed in as a param
  totalAmountElement.innerText = `Total: $${currentTotal.toFixed(2)}`;
}

  //render "food items"
  POS_DATA.foodItems.forEach((foodItem) => {
    const menuItem = createMenuItem(foodItem);
    inventory.appendChild(menuItem);
  });

  //render "drink items"
  POS_DATA.drinkItems.forEach((drinkItem) => {
    const menuItem = createMenuItem(drinkItem);
    inventory.appendChild(menuItem);
  });

  //render "dessert items"
  POS_DATA.dessertItems.forEach((dessertItem) => {
    const menuItem = createMenuItem(dessertItem);
    inventory.appendChild(menuItem);
  });
};

