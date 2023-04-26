let userData = {
  firstName: "",
  name: "",
  address: "",
  birthday: "",
  phoneNumber: "+33",
  multipleQ: {
    yes: false,
    no: false,
  },
  email: "",
  mailNotifications: false,
  identity_doc: undefined,
};
let isValid = false;
const inputs = document.querySelectorAll("input");
const submit_btn = document.querySelector(".submit-btn");
const datePickerContainer = document.querySelector(".birthDate-container");
const datePicker = document.querySelector("#birthDate");
datePicker.addEventListener("change", () => {
  datePickerContainer.classList.add("selected");
});
console.log(datePicker);
// regex for validation
const regex = new RegExp(/^[a-zA-ZÀ-ÿ]+([-'\s][a-zA-ZÀ-ÿ]+)*$/);
const regexNumbers = new RegExp(/[0-9]\d{8}$/);
const regexAddress = new RegExp(/^[\d\w\s,-]+$/i);
const regexMail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
const regexBrithday = new RegExp(
  /^(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/
);
inputs.forEach((input) => {
  input.addEventListener("change", (e) => {
    // pick informations from form
    if (e.target.name == "firstName") {
      regex.test(e.target.value)
        ? (userData.firstName = e.target.value)
        : (userData.firstName = "");
    } else if (e.target.name == "name") {
      regex.test(e.target.value)
        ? (userData.name = e.target.value)
        : (userData.name = "");
    } else if (e.target.name == "address") {
      regexAddress.test(e.target.value)
        ? (userData.address = e.target.value)
        : (userData.address = "");
    } else if (e.target.name == "birthDate") {
      regexBrithday.test(e.target.value)
        ? (userData.birthday = e.target.value)
        : (userData.birthday = "");
    } else if (e.target.name == "phoneNumber") {
      regexNumbers.test(e.target.value)
        ? (userData.phoneNumber = e.target.value)
        : (userData.phoneNumber = "");
    } else if (e.target.name == "email") {
      regexMail.test(e.target.value)
        ? (userData.email = e.target.value)
        : (userData.email = "");
    } else if (e.target.name == "answer-yes") {
      userData.multipleQ.yes = e.target.checked;
    } else if (e.target.name == "answer-no") {
      userData.multipleQ.no = e.target.checked;
    } else if (e.target.name == "checkbox") {
      userData.mailNotifications = e.target.checked;
    } else if (e.target.name == "file") {
      userData.identity_doc = e.target.files[0];
    }
    // form validation
    if (
      regex.test(userData.firstName) &&
      regexAddress.test(userData.address) &&
      regex.test(userData.name) &&
      regexNumbers.test(userData.phoneNumber) &&
      regexMail.test(userData.email) &&
      regexBrithday.test(userData.birthday) &&
      Object.values(userData.multipleQ).some((valeur) => valeur == true) &&
      userData.identity_doc != undefined
    ) {
      isValid = true;
    } else {
      isValid = false;
    }
    if (isValid) {
      submit_btn.disabled = false;
    } else {
      submit_btn.disabled = true;
    }
  });
});
// ecouteur d'event du btn et transfert de donnée
if (window.location.href.includes("index.html")) {
  submit_btn.addEventListener("click", function () {
    if (isValid) {
      localStorage.setItem("userData", JSON.stringify(userData));
      window.location.href = "index2.html";
    }
  });
}

// script pour la 2eme page
window.addEventListener("DOMContentLoaded", function () {
  const storedData = localStorage.getItem("userData");
  if (storedData) {
    const userData = JSON.parse(storedData);
    const spans = document.querySelectorAll("span");
    spans.forEach((span) => {
      if (span.classList.contains("firstName")) {
        span.innerHTML = userData.firstName;
      }
      if (span.classList.contains("name")) {
        span.innerHTML = userData.name;
      }
      if (span.classList.contains("address")) {
        span.innerHTML = userData.address;
      }
      if (span.classList.contains("birthday")) {
        span.innerHTML = userData.birthday;
      }
      if (span.classList.contains("phoneNumber")) {
        span.innerHTML = userData.phoneNumber;
      }
      if (span.classList.contains("email")) {
        span.innerHTML = userData.email;
      }
    });
    localStorage.removeItem("userData");
  }
});
