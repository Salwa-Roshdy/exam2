/// <reference types="../@types/jquery" />
const container = document.querySelector("#meals .container .row");
const mainDiv = document.querySelector("#meals ");

const loading = document.querySelector(".loading-screen");

getByName();
//=============Event===============
$(document).ready(() => {
  getByName("").then(() => {
    $(".loading-screen").fadeOut(500);
    $("body").css("overflow", "visible");
  });
});
//========Search by first letter ===========

async function getByfirstLetter(term) {
  loading.classList.remove("d-none");
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`;
  let apiMeals = await fetch(url);
  let response = await apiMeals.json();
  if (term == " ") {
  } else {
    document.querySelector("#meals .container").classList.remove("d-none");
  }
  displayByName(response.meals.slice(0, 20));
  loading.classList.add("d-none");
}
//========Search by name ===========
async function getByName(term = " ") {
  loading.classList.remove("d-none");
  console.log(term);
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`;
  let apiMeals = await fetch(url);
  let response = await apiMeals.json();
  if (term == " ") {
  } else {
    document.querySelector("#meals .container").classList.remove("d-none");
  }
  displayByName(response.meals.slice(0, 20));
  loading.classList.add("d-none");
}

function displayByName(name) {
  let data = ``;
  for (let i = 0; i < name.length; i++) {
    data += `   <div class="col-md-3">
              <div class="meal-img meals-bg rounded-2"">
                    <img src="${name[i].strMealThumb}" alt="">
                <div class="layer"  data-content="${name[i].idMeal} ">
                  <h2>${name[i].strMeal}</h2>
                </div>
              </div>
            </div>`;
  }

  container.innerHTML = data;
  let meals = document.querySelectorAll("#meals .col-md-3 .layer");
  console.log(meals);
  for (let i = 0; i < meals.length; i++) {
    meals[i].addEventListener("click", function () {
      document.querySelector("#meals .input-container").classList.add("d-none");
      showdetails(name[i].idMeal);
    });
  }
}

//========Search by Categories===========
async function getByCategory() {
  let url = `https://www.themealdb.com/api/json/v1/1/categories.php`;
  let apiMeals = await fetch(url);
  let response = await apiMeals.json();
  displayByCategories(response.categories);
  /* console.log(response.categories); */
}
function displayByCategories(categories) {
  let data = ``;
  for (let i = 0; i < categories.length; i++) {
    data += `   <div class="col-md-3">
            <div class="meal-img meals-bg rounded-2 h-100" id="meal-img">
                  <img src="${categories[i].strCategoryThumb}" alt="">
              <div class="layer ">
              <div class="layer-content text-center" >
                <h2 id="id">${categories[i].strCategory}</h2>
              <p>${categories[i].strCategoryDescription
                .split(" ")
                .slice(0, 20)
                .join(" ")} </p>
              </div>
              </div>
            </div>
          </div>`;
  }
  container.innerHTML = data;
  let catMeal = document.querySelectorAll(".meal-img");
  console.log(catMeal);
  for (let i = 0; i < catMeal.length; i++) {
    let ing = document.querySelector("#id");
    catMeal[i].addEventListener("click", function () {
      getCategoryMeals(categories[i].strCategory);
    });
  }
}

async function getCategoryMeals(category) {
  loading.classList.remove("d-none");
  console.log(category + "meal ");
  let url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  let apiMeals = await fetch(url);
  let response = await apiMeals.json();
  displayCategoryMeals(response.meals.slice(0, 20));
  /*   console.log(response.meals); */
  loading.classList.add("d-none");
}
function displayCategoryMeals(category) {
  let data = ``;
  for (let i = 0; i < category.length; i++) {
    data += `   <div class="col-md-3">
                  <div class="meal-img ing meals-bg rounded-2"">
                        <img src="${category[i].strMealThumb}" alt="">
                                     <div class="layer"  data-content="${category[i].idMeal} ">
                                     <span id="id" class="d-none" > ${category[i].idMeal}    </span>
  
                      <h3>${category[i].strMeal}</h3>
                    </div>
                  </div>
                </div>`;
  }
  container.innerHTML = data;
  let meals = document.querySelectorAll(".meal-img");
  for (let i = 0; i < meals.length; i++) {
    meals[i].addEventListener("click", function () {
      showdetails(category[i].idMeal);
    });
  }
}
//========Search by area===========

async function getByArea() {
  loading.classList.remove("d-none");
  let url = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;
  let apiMeals = await fetch(url);
  let response = await apiMeals.json();

  console.log(response.meals);
  displayByArea(response.meals);
  loading.classList.add("d-none");
}
function displayByArea(areas) {
  let data = ``;
  for (let i = 0; i < areas.length; i++) {
    data += `   <div class="col-md-3">
              <div class="meal-img meals-bg rounded-2 d-flex justify-content-center flex-column align-items-center" data-area="${areas[i].strArea}">
              <i class="fa-solid fa-house-laptop fa-4x"></i>   
             <h2>${areas[i].strArea}</h2>
              
              </div>
            </div>`;
  }
  container.innerHTML = data;
  let areaslist = document.querySelectorAll("#meals .col-md-3 .meal-img");
  console.log(area);

  for (let i = 0; i < areaslist.length; i++) {
    areaslist[i].addEventListener("click", function (e) {
      let dataarea = areaslist[i].getAttribute("data-area");
      console.log(dataarea);
      getAreaMeals(dataarea);
    });
  }
}
//========aREA meals===========
async function getAreaMeals(Country) {
  loading.classList.remove("d-none");
  let url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${Country}`;
  let apiMeals = await fetch(url);
  let response = await apiMeals.json();

  console.log(response.meals);
  displayAreaMeals(response.meals.slice(0, 20));
  loading.classList.add("d-none");
}
function displayAreaMeals(areas) {
  let data = ``;
  for (let i = 0; i < areas.length; i++) {
    data += `   <div class="col-md-3">
                <div class="meal-img meals-bg rounded-2 ">
                      <img src="${areas[i].strMealThumb}" alt="">
                  <div class="layer">
                    <h2>${areas[i].strMeal}</h2>
                  </div>
                </div>
              </div>`;
  }
  container.innerHTML = data;

  let meals = document.querySelectorAll(".meal-img");

  for (let i = 0; i < meals.length; i++) {
    let meal = document.querySelector(".layer");
    meals[i].addEventListener("click", function (e) {
      console.log(areas[i].idMeal);
      showdetails(areas[i].idMeal);
    });
  }
}

//========Search by Ingredients();===========

async function getByIngredients() {
  loading.classList.remove("d-none");
  let url = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`;
  let apiIng = await fetch(url);
  let response = await apiIng.json();
  displayByIngredients(response.meals.slice(0, 20));
  loading.classList.add("d-none");
}
function displayByIngredients(ingredients) {
  let data = ``;

  console.log(ingredients);
  for (let i = 0; i < ingredients.length; i++) {
    data += `   <div class="col-md-3 ">
              <div class="meal-img   meals-bg  pt-4 rounded-2 d-flex justify-content-center flex-column align-items-center " style=" min-height: 150px;">
             <i class="fa-solid fa-drumstick-bite fa-4x "></i>
             <h2>${ingredients[i].strIngredient}</h2>
             <p class="text-center">${ingredients[i].strDescription
               .split(" ")
               .slice(0, 20)
               .join(" ")}</p> 
              </div>
            </div>`;
  }
  container.innerHTML = data;
  let ingredientslist = document.querySelectorAll("#meals .col-md-3 .meal-img");

  for (let i = 0; i < ingredientslist.length; i++) {
    ingredientslist[i].addEventListener("click", function () {
      getIngredientMeals(ingredients[i].strIngredient);
    });
  }
}

//========ingredient meals===========
async function getIngredientMeals(ing) {
  loading.classList.remove("d-none");
  let url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`;
  let apiMeals = await fetch(url);
  let response = await apiMeals.json();

  /*  console.log(response.meals); */
  displayIngredientMeals(response.meals.slice(0, 20));
  loading.classList.add("d-none");
}
function displayIngredientMeals(ings) {
  let data = ``;
  for (let i = 0; i < ings.length; i++) {
    data += `   <div class="col-md-3">
                <div class="meal-img ing meals-bg rounded-2"">
                      <img src="${ings[i].strMealThumb}" alt="">
                                   <div class="layer">
                                   <span id="id" class="d-none" > ${ings[i].idMeal}    </span>

                    <h3>${ings[i].strMeal}</h3>
                  </div>
                </div>
              </div>`;
  }
  container.innerHTML = data;

  let meals = document.querySelectorAll(".meal-img");

  for (let i = 0; i < meals.length; i++) {
    let ing = document.querySelector("#id");
    meals[i].addEventListener("click", function () {
      showdetails(ings[i].idMeal);
    });
  }
}

//========Search by id (details)===========
async function showdetails(mealID) {
  /*   console.log(mealID); */
  loading.classList.remove("d-none");
  let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
  let apiMeals = await fetch(url);
  let response = await apiMeals.json();

  displayByID(response.meals[0]);
  loading.classList.add("d-none");
}

function displayByID(mealDetails) {
  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (mealDetails[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">
    <span class='badge text-secondary'>
      ${mealDetails[`strMeasure${i}`]}
      ${mealDetails[`strIngredient${i}`]}
      </span></li>`;
    }
  }

  let mealBox = ``;
  mealBox += `  <div class="col-md-4">
            <div class="img w-100 ">
               <img src="${mealDetails.strMealThumb}" alt="">
            </div>
            <h1>${mealDetails.strMeal}</h1>
          </div>
          <div class="col-md-8">
            <h3>Instructions</h3>
            <p>
            ${mealDetails.strInstructions}   
            </p>

            <h4>Area : <span> ${mealDetails.strArea}  </span></h4>
            <h4>Category : <span>${mealDetails.strCategory}</span></h4>
            <h4 id="recipes"  >
              Recipes :
             
            </h4>
             <ul class="d-flex p-0 mt-2  ">
                  ${ingredients}              
              </ul>
                  <h4 id="tags" class="mb-3"  >
                    Tags :

            </h4>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                    
        <li class="alert alert-danger m-2 p-1">${mealDetails.strTags}</li>
                </ul>
                                   <div class="mb-4"> 
                                <a type="button" class="btn btn-success" href="${mealDetails.strSource}" target="_blank">Source</a>
<a type="button" class="btn btn-danger" href="${mealDetails.strYoutube}" target="_blank">Youtube</a>
             
          </div>
          </div>`;

  container.innerHTML = mealBox;
}

//========Navbar===========
let openBtn = document.getElementById("openBtn");
let slide = document.querySelector(".slide-nav ");

let slideDisplay = slide.getAttribute("style");
console.log(slideDisplay);
if (slideDisplay == "none") {
  openBtn.classList.remove("fa-xmark");
  openBtn.classList.add("open-close-icon");
}
function getOpenStatus() {
  let side = $(".slide-nav").css("display");
  console.log(side);
  if (side != "none") {
    //mwgoda
    openBtn.classList.add("fa-xmark");
    openBtn.classList.remove("open-close-icon");
  } else if (side != "block") {
    openBtn.classList.remove("fa-xmark");
    openBtn.classList.add("open-close-icon");
  }
}
function getopenLinks() {
  if ($(".slide-nav").css("display") != "block") {
    for (let i = 0; i < 5; i++) {
      $(".nav-list li")
        .eq(i)
        .animate(
          {
            top: 0,
            left: 0,
          },
          (i + 5) * 100
        );
    }
    console.log("mfto7a");
  } else if ($(".slide-nav").css("display") != "none") {
    let list = document.querySelectorAll(".nav-list li");
    for (let i = 0; i < list.length; i++) {
      $(list[i])
        .eq(i)
        .animate(
          {
            top: 300,
            left: -30,
          },
          (i + 5) * 100
        );
      list[i].style.left = "-100px";
      list[i].style.top = "300px";
    }

    console.log("m2fola");
  }
}
function slideNavAnimation() {
  $(".slide-nav ").animate(
    { width: "toggle" },
    1000,
    function () {
      getOpenStatus();
    },
    getopenLinks()
  );
}
let a = 0;
$(".navbar #openBtn").on("click", function () {
  slideNavAnimation();
});

function searchStatus() {
  let searchflag = $(".input-container").css("display");
  if (searchflag != "none") {
    //mwgoda
    document.querySelector(".input-container").classList.add("d-none");
    document.querySelector("#meals .container").classList.remove("d-none");
  }
}
console.log(document.querySelector(".slide-nav"));
$("#categories").on("click", function () {
  searchStatus();
  getByCategory();
  slideNavAnimation();
});
$("#area").on("click", function () {
  searchStatus();
  getByArea();
  slideNavAnimation();
});
$("#ingredients").on("click", function () {
  searchStatus();
  getByIngredients();
  slideNavAnimation();
});
$("#search").on("click", function () {
  searchStatus();
  openSearch();
  slideNavAnimation();
});
$("#contact-us").on("click", function () {
  searchStatus();
  contactus();
  slideNavAnimation();
});

function openSearch() {
  let mainPage = document.getElementById("meals");
  document.querySelector(".input-container").classList.remove("d-none");
  document.querySelector("#meals .container").classList.add("d-none");
  let Name = document.getElementById("InputName");
  let letter = document.getElementById("InputFirstLetter");

  inputSearch(Name);
  inputsearchLetter(letter);
}
function inputSearch(Name) {
  Name.addEventListener("input", function () {
    let term = Name.value;
    if (term) {
      getByName(term);
    }
  });
}

/* for (let i = 0; i < links.length; i++) */
/* linkCat.addEventListener("click", function () {
  if (searchStatus() == true) {
    console.log(" status is true");
  }
}); */

function inputsearchLetter(letter) {
  letter.addEventListener("input", function () {
    let term = letter.value;

    if (term) {
      console.log(term);
      getByfirstLetter(term);
    }
  });
}
let emailInput;
let nameInput;
let phoneInput;
let ageInput;
let passwordInput;
let repasswordInput;
function contactus() {
  let data = ``;
  let container = document.querySelector("#meals .container .row");
  data = `
   <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput"  type="text" class="form-control" data-cont="" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput"  type="email" class="form-control " data-cont=""  placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput"  type="text" class="form-control " data-cont=""  placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput"  type="number" class="form-control " data-cont=""  placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input id="passwordInput"  type="password" class="form-control " data-cont=""  placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input id="repasswordInput"  type="password" class="form-control " data-cont=""  placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled="" class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div>`;

  container.innerHTML = data;

  let emailInput = document.getElementById("emailInput");
  let nameInput = document.getElementById("nameInput");
  let phoneInput = document.getElementById("phoneInput");
  let ageInput = document.getElementById("ageInput");
  let passwordInput = document.getElementById("passwordInput");
  let repasswordInput = document.getElementById("repasswordInput");
  let submitBtn = document.getElementById("submitBtn");

  let name;
  let email;
  let phone;
  let age;
  let password;
  let repassword;
  nameInput.addEventListener("input", function () {
    name = nameInput.value;
    let namealert = document.getElementById("nameAlert");
    if (nameValidation(name) == false) {
      namealert.classList.remove("d-none");
      nameInput.setAttribute("data-cont", "");
    } else {
      namealert.classList.add("d-none");
      nameInput.setAttribute("data-cont", name);
    }
  });
  emailInput.addEventListener("input", function () {
    email = emailInput.value;
    let emailalert = document.getElementById("emailAlert");
    if (emailValidation(email) == false) {
      emailalert.classList.remove("d-none");
      emailInput.setAttribute("data-cont", "");
    } else {
      emailalert.classList.add("d-none");
      emailInput.setAttribute("data-cont", email);
    }
  });
  phoneInput.addEventListener("input", function () {
    phone = phoneInput.value;
    let phonealert = document.getElementById("phoneAlert");
    if (phoneValidation(phone) == false) {
      phonealert.classList.remove("d-none");
      phoneInput.setAttribute("data-cont", "");
    } else {
      phonealert.classList.add("d-none");
      phoneInput.setAttribute("data-cont", phone);
    }
  });
  ageInput.addEventListener("input", function () {
    age = ageInput.value;
    let agealert = document.getElementById("ageAlert");
    if (ageValidation(age) == false) {
      agealert.classList.remove("d-none");
      ageInput.setAttribute("data-cont", "");
    } else {
      agealert.classList.add("d-none");
      ageInput.setAttribute("data-cont", age);
    }
  });
  passwordInput.addEventListener("input", function () {
    password = passwordInput.value;
    let passwordalert = document.getElementById("passwordAlert");
    if (passwordValidation(password) == false) {
      passwordalert.classList.remove("d-none");
      passwordInput.setAttribute("data-cont", "");
    } else {
      passwordalert.classList.add("d-none");
      passwordInput.setAttribute("data-cont", password);
    }
  });
  repasswordInput.addEventListener("input", function () {
    repassword = repasswordInput.value;
    let repasswordalert = document.getElementById("repasswordAlert");
    if (repasswordValidation(repassword) == false) {
      repasswordalert.classList.remove("d-none");
      repasswordInput.setAttribute("data-cont", "");
    } else {
      repasswordalert.classList.add("d-none");
      repasswordInput.setAttribute("data-cont", repassword);
    }
  });

  document.addEventListener("input", function () {
    if (
      emailInput.getAttribute("data-cont") != "" &&
      nameInput.getAttribute("data-cont") != "" &&
      ageInput.getAttribute("data-cont") != "" &&
      phoneInput.getAttribute("data-cont") != "" &&
      passwordInput.getAttribute("data-cont") != "" &&
      repasswordInput.getAttribute("data-cont") != ""
    ) {
      submitBtn.removeAttribute("disabled");
    } else {
      submitBtn.setAttribute("disabled", true);
    }
  });
}

function emailValidation(email) {
  let Regex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (Regex.test(email)) {
    return true;
  } else {
    return false;
  }
}
function nameValidation(name) {
  let Regex = /^[a-zA-Z]+$/;
  if (Regex.test(name)) {
    return true;
  } else {
    return false;
  }
}
function phoneValidation(phone) {
  let Regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  if (Regex.test(phone)) {
    return true;
  } else {
    return false;
  }
}
function ageValidation(age) {
  let Regex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
  if (Regex.test(age)) {
    return true;
  } else {
    return false;
  }
}
function passwordValidation(password) {
  let Regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
  if (Regex.test(password)) {
    return true;
  } else {
    return false;
  }
}
function repasswordValidation() {
  return (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}
