const API = 'https://www.themealdb.com/api/json/v1/1/filter.php?c='; 

const recipes_cards = document.querySelector('.recipes-cards'); 

const menu = [ 
    { img: "br1.svg", name: "breakfast" }, 
    { img: "br2.svg", name: "lunch" }, 
    { img: "br3.svg", name: "dinner" }, 
    { img: "br4.svg", name: "dessert" }, 
    { img: "br5.svg", name: "quick bite!" }, 
]; 

const menuEL = document.getElementById("menu"); 

menuEL.innerHTML = menu.map(m => { 
    return ` 
    <div> 
        <img src="../img/${m.img}" alt=""> 
        <h4>${m.name}</h4> 
    </div>`; 
}).join(''); 

function getMeals(category = "Starter") { 
    fetch(API + category) 
        .then(response => response.json()) 
        .then(foods => { 
            console.log(foods.meals); 
            recipes_cards.innerHTML = foods.meals.slice(0, 6).map(el => { 
                return renderCard(el); 
            }).join(''); 
        }); 
} 

getMeals("Starter"); 

function renderCard(food) {  
    return `  
    <div class="card">  
        <div class="card-img">  
            <img src="${food.strMealThumb}" alt="">  
        </div>  
        <div class="card-text">  
            <h4>${food.strMeal.length > 25 ?   
                food.strMeal.substring(0,23) + '...' : food.strMeal}</h4>  
            <div>  
                <p>40 Min - easy prep - 3 serves</p>  
                <button onclick="showRecipeId('${food.idMeal}')">view recipe</button>  
            </div>  
        </div>  
    </div>`;  
} 

function showRecipeId(id) { 
    alert("ID Рецепта | " + id); 
} 

const recipeButtons = document.querySelectorAll('.recipes-buttons button'); 

recipeButtons.forEach(button => { 
    button.addEventListener('click', () => { 
        recipeButtons.forEach(btn => btn.classList.remove('active-button'));

        button.classList.add('active-button');

        const category = button.textContent; 
        getMeals(category); 
    }); 
});

const starterButton = Array.from(recipeButtons).find(btn => btn.textContent === "Starter");
if (starterButton) {
    starterButton.classList.add('active-button');
}