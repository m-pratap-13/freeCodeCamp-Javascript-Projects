const input = document.getElementById("text-input");
const button = document.getElementById("check-btn");
const output = document.getElementById("result");

function palindrome(inputValue) {
  let normalInput = inputValue.replace(/[^A-Za-z0-9]/g, "").toLowerCase();

  let reverseInput = [...normalInput].reverse().join("");
  return normalInput === reverseInput;
}

function updateDisplay() {
  if (input.value == "") {
    output.innerText = "Please input a value";
  } else if (palindrome(input.value) === true) {
    output.innerText = `${input.value} is a palindrome`;
  } else {
    output.innerText = `${input.value} is not a palindrome`;
  }
}

button.addEventListener("click", updateDisplay);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    updateDisplay();
  }
});
