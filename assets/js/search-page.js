// ? HTML Elements
let rowContainer = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;

//! Varailbles
var baseUrl = "https://www.themealdb.com/api/json/v1/1/";

//* Functions

// $(document).ready(() => {
// 	showSearchInputs();
// });

function openSideMenuBar() {
	$(".side-nav-menu").animate(
		{
			left: 0,
		},
		500
	);

	$(".open-close-icon").removeClass("fa-align-justify");
	$(".open-close-icon").addClass("fa-x");

	for (let i = 0; i < 5; i++) {
		$(".links li")
			.eq(i)
			.animate(
				{
					top: 0,
				},
				(i + 5) * 100
			);
	}
}

function closeSideMenuBar() {
	let width = $(".side-nav-menu .nav-tab").outerWidth();
	$(".side-nav-menu").animate(
		{
			left: -width,
		},
		500
	);

	$(".open-close-icon").addClass("fa-align-justify");
	$(".open-close-icon").removeClass("fa-x");
}

closeSideMenuBar();
$(".side-nav-menu i.open-close-icon").click(() => {
	if ($(".side-nav-menu").css("left") == "0px") {
		closeSideMenuBar();
	} else {
		openSideMenuBar();
	}
});

async function searchByName(term) {
	closeSideMenuBar();
	rowContainer.innerHTML = "";
	$(".inner-loading-screen").fadeIn(300);

	let response = await fetch(`${baseUrl}search.php?s=${term}`);
	response = await response.json();

	response.meals ? displayMeals(response.meals) : displayMeals([]);
	$(".inner-loading-screen").fadeOut(300);
}

//#region Display Methods
function displayMeals(arr) {
	let collection = "";

	for (let i = 0; i < arr.length; i++) {
		collection += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `;
	}

	rowContainer.innerHTML = collection;
}
async function getMealDetails(id) {
	closeSideMenuBar();
	rowContainer.innerHTML = "";
	$(".inner-loading-screen").fadeIn(300);

	searchContainer.innerHTML = "";
	let respone = await fetch(`${baseUrl}lookup.php?i=${id}`);
	respone = await respone.json();

	displayMealDetails(respone.meals[0]);
	$(".inner-loading-screen").fadeOut(300);
}
function displayMealDetails(meal) {
	searchContainer.innerHTML = "";

	let ingredients = ``;

	for (let i = 1; i <= 20; i++) {
		if (meal[`strIngredient${i}`]) {
			ingredients += `<li class="alert alert-info m-2 p-1">${
				meal[`strMeasure${i}`]
			} ${meal[`strIngredient${i}`]}</li>`;
		}
	}

	let tags = meal.strTags?.split(",");
	if (!tags) tags = [];

	let tagsStr = "";
	for (let i = 0; i < tags.length; i++) {
		tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
	}

	let collection = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`;

	rowContainer.innerHTML = collection;
}

function showSearchInputs() {
	searchContainer.innerHTML = `
    <div class="row py-4 justify-content-center">
        <div class="w-75  ">
            <input onkeyup="searchByName(this.value)" class="form-control" type="text" placeholder="Search By Name">
        </div>
       
    </div>`;

	rowContainer.innerHTML = "";
}

showSearchInputs();
//#endregion
