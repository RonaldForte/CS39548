console.clear();
import express from 'express'
import cors from 'cors';

const app = express()
const port = 3000

// CORS middleware to allow our server to receive requests from any URL source.
app.use(cors())

// We will expect JSON data as the common format used to receive/send data to/from this server.
// i.e. incoming requests will have header Content-Type as application/json, and server will respond with JSON response.
app.use(express.json())

// Simple / root path to help verify server is up and running.
app.get('/', (req, res) => {
  res.send('ExpressJS server response OK!')
})

app.post('/search', async (req, res) => {
  try {
    const { searchQuery, searchFood, searchDrink } = req.body;

    if (!searchFood && !searchDrink) { //searchFood and searchDrink are vars handling the checkboxes (cb from on)
      return res.status(400).json({ error: 'Select at least one checkbox (food or drink).' }); //if no cb then throw err
    }

    let apiUrl = '';
    let searchData = {};

    if (searchFood) {
      apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`; //food cb is only pressed
      const response = await fetch(apiUrl);
      searchData.foodData = await response.json();
    }

    if (searchDrink) {
      apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`; //drink cb is only pressed
      const response = await fetch(apiUrl);
      searchData.drinkData = await response.json();
    }
    //REMEMBER TO COME BACK AND CHANGE WHAT HAPPENS IF BOTH CB's ARE PRESSED
    //should it search for both food and drinks under one name?
    //or just throw an error?

    if (!searchData.foodData && !searchData.drinkData) { //if cannot find the searchquery info in searchdata throw err
      return res.status(404).json({ error: 'No results found.' });
    }

    res.json(searchData); //if it did find data, then send json data response to client
  } catch (error) { //if theres an error
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.get('/random/food', async (req, res) => { ///random/food/ enpoint creation
  try {
    const apiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'; 
    const response = await fetch(apiUrl); //will talk to the "food api"'s random page
    const data = await response.json();
    res.json({ data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.get('/random/drink', async (req, res) => {
  try {
    const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'; 
    const response = await fetch(apiUrl); //will talk to the "drink api"'s random page
    const data = await response.json();
    res.json({ data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.get('/id/:ID', async (req, res) => {
  try {
    const { ID } = req.params; //extracts the ID from url param req
    const { type } = req.query; //extracts type from req

    let apiUrl = '';
    if (type === 'food') {
      apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ID}`; //if food, food api url = this (for grabbing info later)
    } else if (type === 'drink') {
      apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ID}`; //if drink, drink api url = this (for grabbing info later)
    } else {
      return res.status(400).json({ error: 'Invalid type parameter. Use "food" or "drink".' });
    }

    const response = await fetch(apiUrl); //grabbing info recieved from fetch req
    const data = await response.json(); //converts body to json

    if (!data || (!data.meals && !data.drinks)) {
      return res.send('<h1>No results found.</h1>'); //if there is no data at all return an empty page says "No results found."
    }

    const item = type === 'food' ? data.meals[0] : data.drinks[0];
            //if type = food grab the [0]meal OR if type != food grab [0]drink

    //construct the html needed to render info
    const htmlContent = `
      <style>
        #lol {
          height: 300px;
        };
      </style>
      <html>
      <head>
        <title>${item.strMeal || item.strDrink}</title>
      </head>
      <body>
        <img id = "lol" src="${item.strMealThumb || item.strDrinkThumb}" alt="${item.strMeal || item.strDrink}">
        <div>ID: ${item.idMeal || item.idDrink}</div>
        <div>Type: ${type === 'food' ? 'Food' : 'Drink'}</div>
        <div>Name: ${item.strMeal || item.strDrink} </div>
        <div>Category: ${item.strCategory}</div>
        <div>Instructions: ${item.strInstructions}</div>
        <div>Ingredients:</div>
        <ul>
          ${generateIngredientsList(item)}
        </ul>
      </body>
      </html>
    `;
    res.send(htmlContent);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

//generating a list of ingredients
function generateIngredientsList(item) {
  let ingredientsList = '';
  for (let i = 1; i <= 20; i++ ) { //assuming that the most ingredients are 20
    const ingredient = item[`strIngredient${i}`]; //curr ingr index gets assigned to ingredients
    const measure = item[`strMeasure${i}`]; //curr measure index gets assigned to measure
    if (ingredient && measure) { //if there exists something
      ingredientsList += `<li>${measure} ${ingredient}</li>`; //add to one step on the list
    }
  }
  return ingredientsList; 
}

app.listen(port, () => { //so the server doesn't instantly close
  console.log(`ExpressJS server listening on PORT: ${port}`)
})