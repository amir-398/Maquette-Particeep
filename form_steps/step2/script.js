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
      const formatBirthday = userData.birthday.split("-");
      const formatedBirthday =
        formatBirthday[2] + "/" + formatBirthday[1] + "/" + formatBirthday[0];
      span.innerHTML = formatedBirthday;
    }
    if (span.classList.contains("phoneNumber")) {
      span.innerHTML = userData.phoneNumber;
    }
    if (span.classList.contains("email")) {
      span.innerHTML = userData.email;
    }
  });
}
localStorage.removeItem("userData");
