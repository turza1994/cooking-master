const searchButton = document.getElementById("search-button");
const mealDetails = document.getElementById("meal-details");
const mealList = document.getElementById("meal-list");

searchButton.addEventListener("click", async () => {
  searchValue = document.getElementById("search-bar").value;
  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
    .then((response) => response.json())
    .then((json) => showMeals(json.meals));
});

const showMeals = (meals) => {
    mealList.innerHTML = "";
    mealDetails.style.display = "none";
    
    if(meals == null){
        alert("Nothing Found. Please search again")
    }
    meals.forEach(meal => {
        let singleMeal = document.createElement("div");
        singleMeal.innerHTML = 
        `
            <img src=${meal.strMealThumb} alt=${meal.strMeal}>
            <p>${meal.strMeal}</p>
        `;
        singleMeal.setAttribute("class", "single-meal")
        mealList.appendChild(singleMeal)
        
        singleMeal.addEventListener("click", ()=>{
            mealDetails.style.display = "block";
            mealDetails.innerHTML = 
            `
                <img src=${meal.strMealThumb} alt=${meal.strMeal}>
                <h3>${meal.strMeal}</h3>
                <p>Ingredients:</p>
                <ul>
                    <li>${meal.strIngredient1}</li>
                    <li>${meal.strIngredient2}</li>
                    <li>${meal.strIngredient3}</li>
                    <li>${meal.strIngredient4}</li>
                    <li>${meal.strIngredient5}</li>
                    <li>${meal.strIngredient6}</li>
                    <li>${meal.strIngredient7}</li>
                </ul>
            `;
            singleMeal.setAttribute("class", "meal-details-style")
        })
    });
}
