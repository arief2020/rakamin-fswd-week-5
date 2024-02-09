const navRegistration = document.getElementById("nav-registration");
const navList = document.getElementById("nav-list-data");
const registrationContent = document.getElementById("registration-content");
const listContent = document.getElementById("list-data-content");
const inputNames = document.getElementById("input-name");
const inputAge = document.getElementById("input-age");
const inputPocketMoney = document.getElementById("input-pocket");
const dangerName = document.getElementById("danger-input-name");
const dangerAge = document.getElementById("danger-input-age");
const dangerMoney = document.getElementById("danger-input-money");
const btnToList = document.getElementById("list");
const btnSubmit = document.getElementById("btn-submitreg");
const btnTheme = document.getElementById("theme");
const textTheme = document.getElementById("text-theme");
const btnMobileThemeForm = document.getElementById("mobile-theme-form");
const textMobileThemeForm = document.getElementById("text-theme-form");
const btnMobileThemeList = document.getElementById("mobile-theme-list");
const textMobileThemeList = document.getElementById("text-theme-list");
let screenWidth = window.innerWidth;
const body = document.body;
const myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
const people = [];

btnSubmit.addEventListener('click', (event) => {
  event.preventDefault();
  const names = inputNames.value;
  const age = inputAge.value;
  const pocketMoney = inputPocketMoney.value;
  const message = {};
  if (names.length < 10) {
    message.name = true;
    dangerName.classList.add("active");

    // return console.log(`name field must have 10 character or more`);
  }
  if (age < 25) {
    message.age = true;
    dangerAge.classList.add("active");
    // message.push(`minimum age must be 25`)
  }
  if (pocketMoney < 100000 || pocketMoney > 1000000) {
    message.pocketMoney = true;
    dangerMoney.classList.add("active");
    // message.push("minimum money must be 100000 and maximum money must be 1000000")
  }
  if (!message) {
    console.log(message);
    clearInput();
    return;
  }
  let person = {
    names: names,
    age: age,
    pocketMoney: pocketMoney,
  };
  people.push(person);
  console.log(people);
  const textResume = resumePeople();
  const resumeTag = document.getElementById("content-resume");
  resumeTag.innerHTML = textResume;
  readPeople();
  clearInput();
  myModal.show();
})
// const functionSubmit = (event) => {
//   event.preventDefault();
//   const names = inputNames.value;
//   const age = inputAge.value;
//   const pocketMoney = inputPocketMoney.value;
//   const message = {};
//   if (names.length < 10) {
//     message.name = true;
//     dangerName.classList.add("active");

//     // return console.log(`name field must have 10 character or more`);
//   }
//   if (age < 25) {
//     message.age = true;
//     dangerAge.classList.add("active");
//     // message.push(`minimum age must be 25`)
//   }
//   if (pocketMoney < 100000 || pocketMoney > 1000000) {
//     message.pocketMoney = true;
//     dangerMoney.classList.add("active");
//     // message.push("minimum money must be 100000 and maximum money must be 1000000")
//   }
//   if (!message) {
//     console.log(message);
//     clearInput();
//     return;
//   }
//   let person = {
//     names: names,
//     age: age,
//     pocketMoney: pocketMoney,
//   };
//   people.push(person);
//   console.log(people);
//   const textResume = resumePeople();
//   const resumeTag = document.getElementById("content-resume");
//   resumeTag.innerHTML = textResume;
//   readPeople();
//   clearInput();
//   myModal.show();
// };

const clearInput = () => {
  document.getElementById("input-name").value = "";
  document.getElementById("input-age").value = "";
  document.getElementById("input-pocket").value = "";
};

const readPeople = () => {
  const data = document.createElement("tr");
  for (let index = 0; index < people.length; index++) {
    data.innerHTML = `
    <th scope="row">${index + 1}</th>
    <td>${people[index].names}</td>
    <td>${people[index].age}</td>
    <td>${people[index].pocketMoney}</td>
    `;
    document.getElementById("table-budy").appendChild(data);
  }
};
const resumePeople = () => {
  let averageOfAge = 0;
  let averageOfMoney = 0;
  for (let index = 0; index < people.length; index++) {
    averageOfAge += parseInt(people[index].age);
    averageOfMoney += parseInt(people[index].pocketMoney);
  }
  averageOfAge = averageOfAge / people.length;
  averageOfMoney = averageOfMoney / people.length;

  return `Rata rata pendaftar memiliki uang sangu sebesar ${averageOfMoney} dengan rata rata umur ${averageOfAge}`;
};

// const goToList = () => {
//   const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
//   myModal.hide()
// listContent.classList.add("active")
// registrationContent.classList.remove("active")
// }

navRegistration.addEventListener("click", () => {
  registrationContent.classList.add("active");
  listContent.classList.remove("active");
});
navList.addEventListener("click", () => {
  listContent.classList.add("active");
  registrationContent.classList.remove("active");
});

inputNames.addEventListener("input", () => {
  if (inputNames.value.trim().length > 10) {
    dangerName.classList.remove("active");
  }
});
inputAge.addEventListener("input", () => {
  if (parseInt(inputAge.value) >= 25) {
    dangerAge.classList.remove("active");
  }
});
inputPocketMoney.addEventListener("input", () => {
  if (
    parseInt(inputPocketMoney.value) >= 100000 &&
    parseInt(inputPocketMoney.value) <= 1000000
  ) {
    dangerMoney.classList.remove("active");
  }
});

btnToList.addEventListener("click", () => {
  myModal.hide();
  listContent.classList.add("active");
  registrationContent.classList.remove("active");
});

btnTheme.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    textTheme.innerHTML = "Light Mode";
  } else {
    textTheme.innerHTML = "Dark Mode";
  }
});

btnMobileThemeForm.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    textMobileThemeForm.innerHTML = "Light Mode";
  } else {
    textMobileThemeForm.innerHTML = "Dark Mode";
  }
});
btnMobileThemeList.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    textMobileThemeList.innerHTML = "Light Mode";
  } else {
    textMobileThemeList.innerHTML = "Dark Mode";
  }
});

function changeTextContent() {
  var screenWidth = window.innerWidth;

  if (screenWidth < 600) {
    navRegistration.innerHTML = "<i class='fa-solid fa-table-list'></i>";
    navList.innerHTML = "<i class='fa-solid fa-user-pen'></i>";
  } else {
    navRegistration.innerHTML = "Registration Form";
    navList.innerHTML = "List of Registrant";
  }
}

// Initial call to change text content
changeTextContent();

// Listen for resize events to update text content
window.addEventListener("resize", changeTextContent);
