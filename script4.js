"use strict";
const showContainer = document.querySelector(".show-container");
const btnSubmit = document.querySelector(".btn-submit");
const first = document.querySelector(".first");
const translate = document.querySelector(".btn-result");
const last = document.querySelector(".last");
const next = document.querySelector(".next");
const addNewBtn = document.querySelector(".add-new");
const addContainer = document.querySelector(".show-container-two");
const selectBox = document.querySelector(".select-box");
const inputPL = document.querySelector(".input-field-pl");
const inputENG = document.querySelector(".input-field-eng");
const btnPost = document.querySelector(".btn-post");

// const data = [
//   { id: 1, pol: "przypuszczac", eng: "assume" },
//   { id: 2, pol: "przyzwoite", eng: "decent" },
//   { id: 3, pol: "mozliwosc", eng: "opportunity" },
//   { id: 4, pol: "zalowac", eng: "regrets" },
//   { id: 5, pol: "5pl", eng: "5eng" },
//   { id: 6, pol: "6pl", eng: "6eng" },
// ];
let data;
let dataLength;
async function loadData() {
  const res = await fetch(
    "https://qolkdmgupszenudshpau.supabase.co/rest/v1/translator",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvbGtkbWd1cHN6ZW51ZHNocGF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY3NDExNzksImV4cCI6MTk5MjMxNzE3OX0.RCnmP2ttGXC3LyV41dYdHpT5xk0yDMKm3tVawA6tgrA",
        autorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvbGtkbWd1cHN6ZW51ZHNocGF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY3NDExNzksImV4cCI6MTk5MjMxNzE3OX0.RCnmP2ttGXC3LyV41dYdHpT5xk0yDMKm3tVawA6tgrA",
      },
    }
  );
  data = await res.json();

  dataLength = data.length;
}
loadData();
btnPost.addEventListener("click", function (e) {
  const newObj = {
    id: dataLength + 1,
    pol: inputPL.value,
    eng: inputENG.value,
  };
  e.preventDefault();
  data.push(newObj);
  dataLength = data.length;
  console.log(data);
  console.log(inputPL.value, inputENG.value);
});

const submit = function (e) {
  e.preventDefault();
  last.textContent = "";
  addContainer.classList.add("hidden");
  showContainer.classList.remove("hidden");
  addNewBtn.textContent = "Add new word";
  let getValue = document.getElementById("select");
  let value = getValue.selectedIndex;
  showContent(value);
};

function randomNum(data) {
  let nume = Math.trunc(Math.random() * dataLength);
  const engWord = data.map((el) => el.eng)[nume];
  const plWord = data.map((el) => el.pol)[nume];
  return [plWord, engWord];
}

function showContent(value) {
  // e.preventDefault();

  if (value === 2) {
    // console.log();
    let word = randomNum(data);
    first.innerHTML = word[0];
    translate.addEventListener("click", () => (last.textContent = word[1]));
    next.addEventListener("click", function () {
      word = randomNum(data);
      first.innerHTML = word[0];
      last.textContent = "";
    });
  }

  if (value === 1) {
    let word = randomNum(data);
    first.innerHTML = word[1];
    translate.addEventListener("click", () => (last.textContent = word[0]));
    next.addEventListener("click", function () {
      word = randomNum(data);
      first.innerHTML = word[1];
      last.textContent = "";
    });
  }
}

addNewBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (addNewBtn.textContent === "Close") {
    addContainer.classList.add("hidden");
    showContainer.classList.remove("hidden");
    addNewBtn.textContent = "Add new word";
  } else {
    addContainer.classList.remove("hidden");
    showContainer.classList.add("hidden");
    addNewBtn.textContent = "Close";
  }
});
btnSubmit.addEventListener("click", submit);
