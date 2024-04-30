$(window).on("load", () => {

  $(".sideBar").css({ left:'0'});
  setTimeout(() => {
    $(".sideBar").css({ left:'-210px'});
  }, 500);

  setTimeout(async ()=>{
    $(".loading-screen").fadeOut(500);
    await displayMeals();
  },500)
})

$(".closebtn").click(function(){
    if ($(".sideBar").css("left") == "-210px") {
      $(".sideBar").css({ left:'0'},500);
      $(".closebtn").removeClass("fa-align-justify").addClass("fa-x");
      $(".links").removeClass("animate__animated animate__bounce animate__fadeOutDownBig").addClass("animate__animated animate__bounce animate__bounceInUp");
    }
    else {
      $(".sideBar").css({ left:'-210px'},500);
      $(".closebtn").removeClass("fa-x").addClass("fa-align-justify");
      $(".links").removeClass("animate__animated animate__bounce animate__bounceInUp").addClass("animate__animated animate__bounce animate__fadeOutDownBig");
    }
})

async function displayMeals(meals="", first_letter=false) {
  if (first_letter){
    let Response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${meals}`)
    myData = await Response.json()
    document.getElementById("home").style.display = "";
    // console.log(myData)
  }
  else{
    let Response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meals}`)
    myData = await Response.json()
    document.getElementById("home").style.display = "";
    // console.log(myData)
  }
  
  let cartoona = ""
  for(i = 0 ; i < myData.meals.length ; i++){
      cartoona += `
        <div class="col-3 gy-4">
          <div onclick="mealDetails(${myData.meals[i].idMeal})" class="main position-relative">
            <img src="${myData.meals[i].strMealThumb}" class="rmImg w-100 rounded-2" alt="pic1">
            <div class="shadow position-absolute w-100 h-100 rounded-2 d-flex align-items-center">
              <p class="shadowP h3 ms-2">${myData.meals[i].strMeal}</p>
            </div>
          </div>
        </div>
      `
  }
  document.querySelector("#row").innerHTML = cartoona;
}

async function mealDetails(idMeal){
  $(".loading-screen").fadeIn(500);

  let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
  myData = await respone.json();
  // console.log(myData)
  
  let ingredients = ``
    for (let i = 1; i <= 20; i++) {
        if (myData.meals[0][`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${myData.meals[0][`strMeasure${i}`]} ${myData.meals[0][`strIngredient${i}`]}</li>`
        }
    }

  let tags = myData.meals[0].strTags?.split(",")
  if (!tags) tags = []

  let allTags = ''
  for (let i = 0; i < tags.length; i++) {
    allTags += `
      <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
  }

  cartoona = `
  <div class="col-md-4 text-white">
              <img class="w-100 rounded-3" src="${myData.meals[0].strMealThumb}"
                  alt="">
                  <h2>${myData.meals[0].strMeal}</h2>
          </div>
          <div class="col-md-8 text-white">
              <h2>Instructions</h2>
              <p>${myData.meals[0].strInstructions}</p>
              <h3><span class="fw-bolder">Area : </span>${myData.meals[0].strArea}</h3>
              <h3><span class="fw-bolder">Category : </span>${myData.meals[0].strCategory}</h3>
              <h3>Recipes :</h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
                  ${ingredients}
              </ul>
              <h3>Tags :</h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
                  ${allTags}
              </ul>
              <a target="_blank" href="${myData.meals[0].strSource}" class="btn btn-success">Source</a>
              <a target="_blank" href="${myData.meals[0].strYoutube}" class="btn btn-danger">Youtube</a>
          </div>`

  document.querySelector("#row").innerHTML = cartoona;
  $(".loading-screen").fadeOut(500);
}

$(".sLink").click(()=>{
  $(".loading-screen").fadeIn(500);
  $(".sideBar").css({ left:'-210px'});
  $(".closebtn").removeClass("fa-x").addClass("fa-align-justify");
  $(".links").addClass("animate__animated animate__bounce animate__fadeOutDownBig");
  document.getElementById("home").style.display = "none";
  document.getElementById("searchContainer").style.display = "";
  
  document.querySelector("#searchContainer").innerHTML = `
  <div class="row py-4 ">
      <div class="col-md-6 ">
          <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
      </div>
      <div class="col-md-6">
          <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
      </div>
  </div>
  `
  $(".loading-screen").fadeOut(500);
})

async function searchByName(term) {
  $(".loading-screen").fadeIn(500);
  displayMeals(term);
  $(".loading-screen").fadeOut(500);
}

async function searchByFLetter(term) {
  $(".loading-screen").fadeIn(500);
  displayMeals(term, true);
  $(".loading-screen").fadeOut(500);
}

$(".cLink").click(async ()=>{
  $(".loading-screen").fadeIn(500);
  $(".sideBar").css({ left:'-210px'});
  $(".closebtn").removeClass("fa-x").addClass("fa-align-justify");
  $(".links").addClass("animate__animated animate__bounce animate__fadeOutDownBig");
  document.getElementById("home").style.display = "";
  document.getElementById("searchContainer").style.display = "none";

  let Response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  myData = await Response.json()
  // console.log(myData)
  
  var cartoona = ""
  for(i = 0 ; i < myData.categories.length ; i++){
      cartoona += `
        <div class="col-3 gy-4">
          <div onclick="categoryList('${myData.categories[i].strCategory}')" class="main position-relative">
            <img src="${myData.categories[i].strCategoryThumb}" class="rmImg w-100 rounded-2" alt="pic1">
            <div class="shadow position-absolute w-100 h-100 rounded-2 d-flex flex-column align-items-center">
              <p class="shadowP h3 ms-2">${myData.categories[i].strCategory}</p>
              <p class="shadowP h6 ms-2">${myData.categories[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
          </div>
        </div>
      `
  }
  document.querySelector("#row").innerHTML = cartoona;
  $(".loading-screen").fadeOut(500);
})

async function categoryList(strCategory){
  $(".loading-screen").fadeIn(500);

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`)
  myData = await response.json()

  let cartoona = ""
  for(i = 0 ; i < myData.meals.slice(0, 20).length ; i++){
      cartoona += `
        <div class="col-3 gy-4">
          <div onclick="mealDetails(${myData.meals[i].idMeal})" class="main position-relative">
            <img src="${myData.meals[i].strMealThumb}" class="rmImg w-100 rounded-2" alt="pic1">
            <div class="shadow position-absolute w-100 h-100 rounded-2 d-flex align-items-center">
              <p class="shadowP h3 ms-2">${myData.meals[i].strMeal}</p>
            </div>
          </div>
        </div>
      `
  }
  document.querySelector("#row").innerHTML = cartoona;

  $(".loading-screen").fadeOut(500);
}

$(".aLink").click(async ()=>{
  $(".loading-screen").fadeIn(500);
  $(".sideBar").css({ left:'-210px'});
  $(".closebtn").removeClass("fa-x").addClass("fa-align-justify");
  $(".links").addClass("animate__animated animate__bounce animate__fadeOutDownBig");
  document.getElementById("home").style.display = "";
  document.getElementById("searchContainer").style.display = "none";

  let Response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  myData = await Response.json()
  // console.log(myData)
  
  var cartoona = ""
  for(i = 0 ; i < myData.meals.length ; i++){
      cartoona += `
        <div class="col-3 gy-4">
          <div onclick="areaList('${myData.meals[i].strArea}')" class="main position-relative text-center">
            <i class="fa-solid fa-house-laptop fa-4x w-100 rounded-2 text-white"></i>
            <p class="shadowP text-white h3 ms-2">${myData.meals[i].strArea}</p>
          </div>
        </div>
      `
  }
  document.querySelector("#row").innerHTML = cartoona;
  $(".loading-screen").fadeOut(500);
})

async function areaList(strArea){
  $(".loading-screen").fadeIn(500);

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${strArea}`)
  myData = await response.json()
  // console.log(myData);

  let cartoona = ""
  for(i = 0 ; i < myData.meals.slice(0, 20).length ; i++){
      cartoona += `
        <div class="col-3 gy-4">
          <div onclick="mealDetails(${myData.meals[i].idMeal})" class="main position-relative">
            <img src="${myData.meals[i].strMealThumb}" class="rmImg w-100 rounded-2" alt="pic1">
            <div class="shadow position-absolute w-100 h-100 rounded-2 d-flex align-items-center">
              <p class="shadowP h3 ms-2">${myData.meals[i].strMeal}</p>
            </div>
          </div>
        </div>
      `
  }
  document.querySelector("#row").innerHTML = cartoona;

  $(".loading-screen").fadeOut(500);
}

$(".iLink").click(async ()=>{
  $(".loading-screen").fadeIn(500);
  $(".sideBar").css({ left:'-210px'});
  $(".closebtn").removeClass("fa-x").addClass("fa-align-justify");
  $(".links").addClass("animate__animated animate__bounce animate__fadeOutDownBig");
  document.getElementById("home").style.display = "";
  document.getElementById("searchContainer").style.display = "none";

  let Response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  myData = await Response.json()
  // console.log(myData)

  var cartoona = ""
  for(i = 0 ; i < myData.meals.length ; i++){
    if(!myData.meals[i].strDescription){
      continue
    }
    cartoona += `
      <div class="col-3 gy-4">
        <div onclick="ingredientList('${myData.meals[i].strIngredient}')" class="main position-relative text-center">
          <i class="fa-solid fa-drumstick-bite fa-4x w-100 rounded-2 text-white"></i>
          <p class="shadowP text-white h3 ms-2">${myData.meals[i].strIngredient}</p>
          <p class="shadowP text-white h6 ms-2">${myData.meals[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
        </div>
      </div>
    `
  }
  document.querySelector("#row").innerHTML = cartoona;
  $(".loading-screen").fadeOut(500);
})

async function ingredientList(strIngredient){
  $(".loading-screen").fadeIn(500);


  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${strIngredient}`)
  myData = await response.json()
  // console.log(myData);

  let cartoona = ""
  for(i = 0 ; i < myData.meals.slice(0, 20).length ; i++){
      cartoona += `
        <div class="col-3 gy-4">
          <div onclick="mealDetails(${myData.meals[i].idMeal})" class="main position-relative">
            <img src="${myData.meals[i].strMealThumb}" class="rmImg w-100 rounded-2" alt="pic1">
            <div class="shadow position-absolute w-100 h-100 rounded-2 d-flex align-items-center">
              <p class="shadowP h3 ms-2">${myData.meals[i].strMeal}</p>
            </div>
          </div>
        </div>
      `
  }
  document.querySelector("#row").innerHTML = cartoona;

  $(".loading-screen").fadeOut(500);
}

$(".uLink").click(()=>{
  $(".loading-screen").fadeIn(500);
  $(".sideBar").css({ left:'-210px'});
  $(".closebtn").removeClass("fa-x").addClass("fa-align-justify");
  $(".links").addClass("animate__animated animate__bounce animate__fadeOutDownBig");
  document.getElementById("home").style.display = "";
  document.getElementById("searchContainer").style.display = "none";

  cartoona = `
  <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
      <div class="row g-4">
          <div class="col-md-6">
              <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
              <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Special characters and numbers not allowed
              </div>
          </div>
          <div class="col-md-6">
              <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
              <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Email not valid *exemple@yyy.zzz
              </div>
          </div>
          <div class="col-md-6">
              <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
              <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid Phone Number
              </div>
          </div>
          <div class="col-md-6">
              <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
              <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid age
              </div>
          </div>
          <div class="col-md-6">
              <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
              <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid password *Minimum eight characters, at least one letter and one number:*
              </div>
          </div>
          <div class="col-md-6">
              <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
              <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid repassword 
              </div>
          </div>
      </div>
      <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-5">Submit</button>
  </div>
</div> `
  document.querySelector("#row").innerHTML = cartoona;
  submitBtn = document.querySelector("#submitBtn")
  $(".loading-screen").fadeOut(500);


  $("#nameInput").focus(function() {
    nameInputTouched = true;
  });
  $("#emailInput").focus(function() {
    emailInputTouched = true;
  });
  $("#phoneInput").focus(function() {
    phoneInputTouched = true;
  });
  $("#ageInput").focus(function() {
    ageInputTouched = true;
  });
  $("#passwordInput").focus(function() {
    passwordInputTouched = true;
  });
  $("#repasswordInput").focus(function() {
    repasswordInputTouched = true;
  });
})

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      $("#nameAlert").removeClass("d-block").addClass("d-none");
    } else {
      $("#nameAlert").removeClass("d-none").addClass("d-block");
    }
  }
  if (emailInputTouched) {
    if (emailValidation()) {
      $("#emailAlert").removeClass("d-block").addClass("d-none");
    } else {
      $("#emailAlert").removeClass("d-none").addClass("d-block");
    }
  }
  if (phoneInputTouched) {
    if (phoneValidation()) {
      $("#phoneAlert").removeClass("d-block").addClass("d-none");
    } else {
      $("#phoneAlert").removeClass("d-none").addClass("d-block");
    }
  }
  if (ageInputTouched) {
    if (ageValidation()) {
      $("#ageAlert").removeClass("d-block").addClass("d-none");
    } else {
      $("#ageAlert").removeClass("d-none").addClass("d-block");
    }
  }
  if (passwordInputTouched) {
    if (passwordValidation()) {
      $("#passwordAlert").removeClass("d-block").addClass("d-none");
    } else {
      $("#passwordAlert").removeClass("d-none").addClass("d-block");
    }
  }
  if (repasswordInputTouched) {
    if (repasswordValidation()) {
      $("#repasswordAlert").removeClass("d-block").addClass("d-none");
    } else {
      $("#repasswordAlert").removeClass("d-none").addClass("d-block");
    }
  }
  if (nameValidation() &&
      emailValidation() &&
      phoneValidation() &&
      ageValidation() &&
      passwordValidation() &&
      repasswordValidation()) {
    $("#submitBtn").removeAttr("disabled");
  } else {
    $("#submitBtn").attr("disabled", true);
  }
}

function nameValidation() {
  return (/^[a-zA-Z ]+$/.test($("#nameInput").val()));
}
function emailValidation() {
  return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($("#emailInput").val()));
}
function phoneValidation() {
  return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test($("#phoneInput").val()));
}
function ageValidation() {
  return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test($("#ageInput").val()));
}
function passwordValidation() {
  return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test($("#passwordInput").val()));
}
function repasswordValidation() {
  return $("#repasswordInput").val() === $("#passwordInput").val();
}