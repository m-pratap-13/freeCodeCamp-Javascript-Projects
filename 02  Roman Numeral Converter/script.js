const input = document.getElementById("number");
const button = document.getElementById("convert-btn");
const output = document.getElementById("output");

let romanLists = [
  ["M", 1000],
  ["CM", 900],
  ["D", 500],
  ["CD", 400],
  ["C", 100],
  ["XC", 90],
  ["L", 50],
  ["XL", 40],
  ["X", 10],
  ["IX", 9],
  ["V", 5],
  ["IV", 4],
  ["I", 1],
];

function convertToRoman(num) {
  let romanNumber = "";
  for (let i = 0; i < romanLists.length; i++) {
    while (num >= romanLists[i][1]) {
      romanNumber += romanLists[i][0];
      num -= romanLists[i][1];
    }
  }
  return romanNumber;
}

function updateDisplay() {
  if (input.value === "") {
    output.innerText = "Please enter a valid number";
    output.style.color = "red";
    output.style.fontSize = "20px";
  } else if (input.value <= 0) {
    output.innerText = "Please enter a number greater than 0";
    output.style.color = "red";
    output.style.fontSize = "20px";
  } else if (input.value > 3999) {
    output.innerText = "Please enter a number less than 4000";
    output.style.color = "red";
    output.style.fontSize = "20px";
  } else {
    output.innerText = convertToRoman(input.value);
    output.style.fontSize = "30px";
    output.style.color = "white";
  }
}

button.addEventListener("click", updateDisplay);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    updateDisplay();
  }
});
