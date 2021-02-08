const searchButton = document.getElementById("search-button");
const mealDetails = document.getElementById("meal-details");
const notFound = document.querySelector("#not-found");
const mealList = document.getElementById("meal-list");

searchButton.addEventListener("click", () => {
  searchValue = document.getElementById("search-bar").value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
    .then((response) => response.json() )
    .then((json) => showMeals(json.meals) )
    .catch((error) => console.log(error) );
});

const showMeals = (meals) => {

    //---Resetting the values---
    mealList.innerHTML = "";
    mealDetails.innerHTML = "";
    mealDetails.style.display = "none";
    notFound.innerHTML = "";
    //-------------------------

    //---If meals not found---
    if(meals == null){
        return showNotFound();
    }
    //------------------------

    meals.forEach(meal => {
        let singleMeal = document.createElement("div");
        singleMeal.innerHTML = 
        `
            <div class="col">
                <div class="card text-white bg-dark text-center h-100">
                    <img src=${meal.strMealThumb} class="card-img-top" alt=${meal.strMeal}>
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                    </div>
                </div>
            </div>
        `;
        singleMeal.setAttribute("class", "single-meal")
        mealList.appendChild(singleMeal)
        
        //---Details about a specific meal item---
        singleMeal.addEventListener("click", ()=>{
            mealDetails.style.display = "block";
            mealDetails.innerHTML = 
            `
                <div class="text-white bg-dark w-50 h-50 rounded shadow-lg mb-4 d-flex flex-column flex-sm-row">
                    <img class="w-50 rounded" src=${meal.strMealThumb} alt=${meal.strMeal} class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <ul>
                            <li>${meal.strIngredient1}</li>
                            <li>${meal.strIngredient2}</li>
                            <li>${meal.strIngredient3}</li>
                            <li>${meal.strIngredient4}</li>
                            <li>${meal.strIngredient5}</li>
                            <li>${meal.strIngredient6}</li>
                            <li>${meal.strIngredient7}</li>
                        </ul>
                    </div>
                </div>
            `;
            singleMeal.setAttribute("class", "meal-details-style")
        })
        //--------------------------------------------------------
    });
}

const showNotFound = () => {
    notFound.innerHTML = `<h1 class="not-found">Items not found. Search again</h1>`;
}
