const renderItem = (container, item, type) => {
  const resultItem = document.createElement('div');
  resultItem.classList.add('result-item');

  const photo = document.createElement('img');
  photo.alt = item.strMeal || item.strDrink;
  photo.src = item.strMealThumb || item.strDrinkThumb || 'client/assets/placeholder.png';
  resultItem.appendChild(photo);

  const nameId = document.createElement('div');
  nameId.innerHTML = `
    <div>ID: ${item.idMeal || item.idDrink}</div>
  `;
  resultItem.appendChild(nameId);
  const typeCategory = document.createElement('div');
  typeCategory.innerHTML = `
    <div>Type: ${type === 'food' ? 'Food' : 'Drink'}</div>
    <div>Name: ${item.strMeal || item.strDrink}</div>
    <div>Category: ${item.strCategory}</div>
  `;
  resultItem.appendChild(typeCategory);

  const recipeLink = document.createElement('a');
  recipeLink.href = `http://localhost:3000/id/${item.idMeal || item.idDrink}?type=${type}`;
  recipeLink.textContent = 'Recipe';
  resultItem.appendChild(recipeLink);
  container.appendChild(resultItem);
};

const sendSearchRequest = () => {
  const searchQuery = document.getElementById('search-query').value;
  const searchFood = document.getElementById('search-food').checked;
  const searchDrink = document.getElementById('search-drink').checked;

  if (searchQuery && (searchFood || searchDrink)) { //if the search isn't empty and atleast one check box
    //send a Post req
    fetch('http://localhost:3000/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ searchQuery, searchFood, searchDrink }),
    })
      .then(response => response.json()) //converting to json
      .then(data => {
        // Passing the inputted food and checkmarks to renderResults
        renderResults(data, searchFood, searchDrink); //implement tmmrw
      })
      .catch(error => { //log an error if somehow this doesn't execute. idk if needed but should have a catch just in case
        console.error('Error:', error);
      });
  } else { //executes if the condition isn't met so want to throw an error :3
    console.error('Please enter a search query and select at least one checkbox (food or drink).');
  }
};

//implementaion of renderResults. I need it to take in the input (search query and check boxes) 
//and provide the necessary html to be rendered with the API's info
//function changed with help from group
const renderResults = (data, searchFood, searchDrink) => {
  const resultContainer = document.getElementById('result-container');
  resultContainer.innerHTML = '';

  if (searchFood && data.foodData) { //handles food
    const foodItems = data.foodData.meals;
    foodItems.forEach(item => {
      renderItem(resultContainer, item, 'food');
    });
  }

  if (searchDrink && data.drinkData) { //handles drinks
    const drinkItems = data.drinkData.drinks;
    drinkItems.forEach(item => {
      renderItem(resultContainer, item, 'drink');
    });
  }

  if (!searchFood && !searchDrink) { //input isnt any
    const noResults = document.createElement('div');
    noResults.textContent = 'No results found.';
    resultContainer.appendChild(noResults);
  }
};

//function to fetch recipe by ID and type (food/drink)
const fetchRecipeById = (id, type) => {
  fetch(`http://localhost:3000/id/${id}?type=${type}`) //sending a get req for the specified id and type :p
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok'); //if cant grab then throw an error
      }
      return response.text(); //converts the json retrieved to html text
    })
    .then(htmlContent => {
      //after getting the html content from the api, render it to to 'recipe-detail-container'
      const recipeDetailContainer = document.getElementById('recipe-detail-container');
      recipeDetailContainer.innerHTML = htmlContent;
    })
    .catch(error => { //an error just in case for debugging
      console.error('Error:', error);
    });
};

//this funct needs to fetch random data from an endpoint, check if the resposne was good or not, then calls on a render funct
const sendRandomRequest = () => {
  const searchFood = document.getElementById('search-food').checked;
  const searchDrink = document.getElementById('search-drink').checked;

  let randomEndpoint = '';
  if (searchFood && !searchDrink) {
    randomEndpoint = 'http://localhost:3000/random/food'; //if its a food the endpoint is /random/food
  } else if (!searchFood && searchDrink) {
    randomEndpoint = 'http://localhost:3000/random/drink';  //if its a food the endpoint is /random/drink
  } else {  //no selection was derieved
    console.error('Please select either "Food" or "Drink" for random selection.');
    return;
  }

  fetch(randomEndpoint)
    .then(response => { 
      if (!response.ok) {
        throw new Error('Network response was not good'); //throws error if response status isn't successful
      }
      return response.json(); //if it was okay then return as json format
    })
    .then(data => { //now with the json format,
      console.log('Random Selection:', data); //console.log for debugging (needed this so badly)
      renderRandomResults(data.data, searchFood, searchDrink); //calling function to render the random drink/food
    })
    .catch(error => {
      console.error('Error:', error); //handles error durign fetch req
    });
};

const renderRandomResults = (data, searchFood, searchDrink) => { 
  const resultContainer = document.getElementById('result-container');
  resultContainer.innerHTML = ''; //clear any previous html
  
  if (searchFood && data.meals) {
    data.meals.forEach(item => {
      renderRandomItem(resultContainer, item, 'food');
    });
  } else if (searchDrink && data.drinks) {
    data.drinks.forEach(item => {
      renderRandomItem(resultContainer, item, 'drink');
    });
  } else {
    const noResults = document.createElement('div');
    noResults.textContent = 'No results found.';
    resultContainer.appendChild(noResults);
  }
};


const renderRandomItem = (container, item, type) => { //basically the exact same as RenderRandom but kept getting weird errors
  const resultItem = document.createElement('div');
  resultItem.classList.add('result-item');

  const photo = document.createElement('img');
  photo.src = item.strMealThumb || item.strDrinkThumb || 'client/assets/placeholder.png';
  resultItem.appendChild(photo);
  
  const nameId = document.createElement('div');
  nameId.innerHTML = `
    <div>ID: ${item.idMeal || item.idDrink}</div>
  `;
  resultItem.appendChild(nameId);

  const typeCategory = document.createElement('div');
  typeCategory.innerHTML = `
    <div>Type: ${type === 'food' ? 'Food' : 'Drink'}</div>
    <div>Name: ${item.strMeal || item.strDrink}</div>
    <div>Category: ${item.strCategory}</div>
  `;
  resultItem.appendChild(typeCategory);

  const recipeLink = document.createElement('a');
  recipeLink.href = `http://localhost:3000/id/${item.idMeal || item.idDrink}?type=${type}`;
  recipeLink.textContent = 'Recipe';
  resultItem.appendChild(recipeLink);
  
  container.appendChild(resultItem);
};

//if I want to fix anything later/ optimize, i can change all the random functions and 
//maybe have a boolean set as a param for Render Result. This way it can handle both situations: random/ or not random
//since they basically have the same functionality


//executes on windowload. These are important to have appear first.
window.onload = () => {
  const searchButton = document.getElementById('search-btn');
  searchButton.addEventListener('click', sendSearchRequest);

  const randomButton = document.getElementById('random-btn');
  randomButton.addEventListener('click', sendRandomRequest);
};