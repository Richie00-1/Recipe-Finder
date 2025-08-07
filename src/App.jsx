import { useState, useEffect} from 'react'  
import './App.css'

const apiUrl = 'https://www.themealdb.com/api/json/v1/1';
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`${apiUrl}/search.php?s=${searchTerm}`);
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      setRecipes([]);
      console.error('Error fetching recipes:', error);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchRecipes();
    }
  }, [searchTerm]);

  return (
    <>
      <div className="header">
        <img src="./src/assets/chef-logo.svg" alt="Chef Logo" className="chef-logo" />
        <h1>Recipe Finder</h1>
        <div className="card">
          <p><strong>
            Find the best recipes tailored to your taste!</strong>
          </p>
          <input
            type="text"
            placeholder="Search for recipes..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') fetchRecipes();
            }}
          />
          <button onClick={fetchRecipes}>
            Find Recipes
          </button>
        </div>
        <div className="results">
          {recipes.length === 0 && searchTerm && (
            <p>No recipes found.</p>
          )}
          {recipes.length > 0 && (
            <ul className="recipe-list">
              {recipes.map(recipe => (
                <li key={recipe.idMeal} className="recipe-item">
                  <h3>{recipe.strMeal}</h3>
                  <a href={recipe.strSource || `https://www.themealdb.com/meal/${recipe.idMeal}`} target="_blank" rel="noopener noreferrer">
                    <img src={recipe.strMealThumb} alt={recipe.strMeal} width={150} />
                  </a>
                  <p>{recipe.strCategory} | {recipe.strArea}</p>
                  </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

export default App
