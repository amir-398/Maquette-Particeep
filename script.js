let userData = {
  firstName: "",
  name: "",
  address: "",
  birthday: "",
  phoneNumber: "",
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
const upload_wrapper = document.querySelector(".upload-wrapper");
const file_info = document.querySelector(".files-info");
const file_info_p = document.querySelector(".files-info p");
const checkbox = document.querySelectorAll(".checkbox-container input");
const toggler = document.querySelector(".toggle-container input");

// regex for validation
const regex = new RegExp(/^[a-zA-ZÀ-ÿ]+([-'\s][a-zA-ZÀ-ÿ]+)*$/);
const regexNumbers = new RegExp(/[0-9]\d{8}$/);
const regexAddress = new RegExp(/^[\d\w\s,-]+$/i);
const regexMail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
const regexBrithday = new RegExp(
  /^(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/
);

// toggler mail notifications
toggler.addEventListener("change", (e) => {
  if (e.target.checked) {
    userData.mailNotifications = true;
  } else {
    userData.mailNotifications = false;
  }
});

// multiples questions
checkbox.forEach((box) => {
  box.addEventListener("change", (e) => {
    if (e.target.name == "answer-yes") {
      userData.multipleQ.yes = e.target.checked;
    }
    if (e.target.name == "answer-no") {
      userData.multipleQ.no = e.target.checked;
    }
  });
});

// pick informations from form
inputs.forEach((input) => {
  input.addEventListener("change", (e) => {
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
      if (
        regexNumbers.test(e.target.value) &&
        (e.target.value.length == 9 || e.target.value.length == 10)
      ) {
        if (e.target.value.charAt(0) == 0) {
          userData.phoneNumber = "+33" + e.target.value.slice(1);
        } else {
          userData.phoneNumber = "+33" + e.target.value;
        }
      }
    } else if (e.target.name == "email") {
      regexMail.test(e.target.value)
        ? (userData.email = e.target.value)
        : (userData.email = "");
    } else if (e.target.name == "answer-yes") {
      userData.multipleQ.yes = e.target.checked;
    } else if (e.target.name == "answer-no") {
      userData.multipleQ.no = e.target.checked;
    } else if (e.target.name == "file") {
      userData.identity_doc = e.target.files[0];
      upload_wrapper.classList.add("hide");
      file_info.classList.remove("hide");
      file_info_p.innerHTML = e.target.files[0].name;
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
      submit_btn.classList.remove("disabled");
    } else {
      submit_btn.classList.add("disabled");
    }
  });
});

// send info to step 2
submit_btn.addEventListener("click", function () {
  if (isValid) {
    submit_btn.href = "/form_steps/step2/index.html";
    localStorage.setItem("userData", JSON.stringify(userData));
  } else {
    alert("Veuillez remplir tous les champs");
  }
});

// handle date picker
datePicker.addEventListener("change", () => {
  datePickerContainer.classList.add("selected");
});
