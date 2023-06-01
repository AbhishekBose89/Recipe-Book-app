const apiKey = "7536cb7d96a7422c82067d53b6523e50";
const recipeList = document.querySelector("#recipe-list");

const getRecipes = async () => {
    const response = await fetch(
        `https://api.spoonacular.com/recipes/random?number=10&apiKey=${apiKey}`
    );
    const data = await response.json();
    console.log(data.recipes)
    return data.recipes;
};

const displayRecipes = (recipes) => {
    recipeList.innerHTML = "";
    recipes.forEach((recipe) => {
        const recipeItem = document.createElement("li");
        recipeItem.classList.add("recipe-item");

        const recipeImage = document.createElement("img");
        recipeImage.src = recipe.image;
        recipeImage.alt = "recipe image";
        recipeItem.appendChild(recipeImage);

        const recipeTitle = document.createElement("h2");
        recipeTitle.innerText = recipe.title;
        recipeItem.appendChild(recipeTitle);

        const recipeIngredients = document.createElement("p");
        recipeIngredients.innerHTML = `<strong>Ingredients:</strong>${recipe.extendedIngredients.map(
            (ingredient) => ingredient.original
        ).join(",")}`;
        recipeItem.append(recipeIngredients)

        const viewRecipe = document.createElement("a")
        viewRecipe.href = recipe.sourceUrl
        viewRecipe.innerText = "View Recipe"
        recipeItem.appendChild(viewRecipe)

        recipeList.appendChild(recipeItem);
    });
};

const init = async () => {
    const recipes = await getRecipes();
    displayRecipes(recipes);
};

init();
