// ? HTML Elements
let submitBtn = document.getElementById("submitBtn");

//! Varailbles
var baseUrl = "https://www.themealdb.com/api/json/v1/1/";

//* Functions

$(document).ready(() => {});

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

//#region Validators
function nameValidator() {
	if (nameValidation()) {
		document.getElementById("nameAlert").classList.replace("d-block", "d-none");
	} else {
		document.getElementById("nameAlert").classList.replace("d-none", "d-block");
	}
}
function emailValidator() {
	if (emailValidation()) {
		document
			.getElementById("emailAlert")
			.classList.replace("d-block", "d-none");
	} else {
		document
			.getElementById("emailAlert")
			.classList.replace("d-none", "d-block");
	}
}
function phoneValidator() {
	if (phoneValidation()) {
		document
			.getElementById("phoneAlert")
			.classList.replace("d-block", "d-none");
	} else {
		document
			.getElementById("phoneAlert")
			.classList.replace("d-none", "d-block");
	}
}
function passwordValidator() {
	if (passwordValidation()) {
		document
			.getElementById("passwordAlert")
			.classList.replace("d-block", "d-none");
	} else {
		document
			.getElementById("passwordAlert")
			.classList.replace("d-none", "d-block");
	}
}
function ageValidator() {
	if (ageValidation()) {
		document.getElementById("ageAlert").classList.replace("d-block", "d-none");
	} else {
		document.getElementById("ageAlert").classList.replace("d-none", "d-block");
	}
}
function rePasswordValidator() {
	if (repasswordValidation()) {
		document
			.getElementById("repasswordAlert")
			.classList.replace("d-block", "d-none");
	} else {
		document
			.getElementById("repasswordAlert")
			.classList.replace("d-none", "d-block");
	}
}

function formValidation() {
	if (
		nameValidation() &&
		emailValidation() &&
		phoneValidation() &&
		ageValidation() &&
		passwordValidation() &&
		repasswordValidation()
	) {
		submitBtn.removeAttribute("disabled");
	} else {
		submitBtn.setAttribute("disabled", true);
	}
}

function nameValidation() {
	return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
	return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		document.getElementById("emailInput").value
	);
}

function phoneValidation() {
	return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
		document.getElementById("phoneInput").value
	);
}

function ageValidation() {
	return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
		document.getElementById("ageInput").value
	);
}

function passwordValidation() {
	return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
		document.getElementById("passwordInput").value
	);
}

function repasswordValidation() {
	return (
		document.getElementById("repasswordInput").value ==
		document.getElementById("passwordInput").value
	);
}
//#endregion
