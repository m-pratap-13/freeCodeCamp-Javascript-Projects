const input = document.getElementById("user-input");
const results = document.getElementById("results-div");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");

function telephoneCheck(str) {
  const numberFormat = /^1?\s?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;
  return numberFormat.test(str);
}

checkBtn.addEventListener("click", () => {
  if (input.value == "") {
    alert("Please provide a phone number");
  } else if (telephoneCheck(input.value)) {
    const newPara = document.createElement("p");
    const newText = document.createTextNode(`Valid US Number : ${input.value}`);
    newPara.appendChild(newText);
    results.appendChild(newPara);
  } else {
    const newPara = document.createElement("p");
    const newText = document.createTextNode(
      `Invalid US Number : ${input.value}`
    );

    newPara.appendChild(newText);
    results.appendChild(newPara);
  }
});
clearBtn.addEventListener("click", () => {
  results.innerHTML = "";
  input.value = "";
});
