const drawer = document.getElementById("cash-drawer-display");
const cash = document.getElementById("cash");
const button = document.getElementById("purchase-btn");
const display = document.getElementById("change-due");

let price = 3.26;

let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

function checkCashRegister() {
  const cashInCents = Math.round(Number(cash.value) * 100);
  const priceInCents = Math.round(price * 100);

  if (cashInCents < priceInCents) {
    alert("Customer does not have enough money to purchase the item");
    cash.value = "";
    return;
  }
  if (cashInCents === priceInCents) {
    display.innerHTML = "<p>No change due - customer paid with exact cash</p>";
    cash.value = "";
    return;
  }

  let changeDue = cashInCents - priceInCents;
  let currAmountInCents = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];

  const result = { status: "OPEN", change: [] };
  let totalCID = Math.round(cid.reduce((sum, val) => sum + val[1], 0) * 100);

  if (totalCID < changeDue) {
    display.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
    return;
  }

  if (totalCID === changeDue) {
    result.status = "CLOSED";
  }
  const reversedCid = [...cid]
    .reverse()
    .map(([denominationName, amount]) => [
      denominationName,
      Math.round(amount * 100),
    ]);

  for (let i = 0; i < reversedCid.length; i++) {
    if (changeDue >= currAmountInCents[i] && changeDue > 0) {
      const [currName, currValue] = reversedCid[i];
      const changeFromCID = Math.min(currValue, changeDue);
      const count = Math.floor(changeFromCID / currAmountInCents[i]);
      const amountInChange = count * currAmountInCents[i];
      changeDue -= amountInChange;
      console.log(changeDue);

      if (count > 0) {
        result.change.push([currName, amountInChange / 100]);
      }
    }
  }
  console.log(changeDue);
  if (changeDue > 0) {
    display.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
    return;
  }
  resultDisplay(result.status, result.change);
  updateDisplay(result.change);
}

function resultDisplay(status, change) {
  display.innerHTML = `<p>Status: ${status}</p>`;
  change.map(
    ([currName, value]) =>
      (display.innerHTML += `<p>${currName}: $${value}</p>`)
  );
}
function updateDisplay(change) {
  if (change) {
    change.forEach(([changeCurrName, changeValue]) => {
      const targetCurrName = cid.find(
        ([currName]) => currName === changeCurrName
      );
      console.log(targetCurrName);
      targetCurrName[1] =
        (Math.round(targetCurrName[1] * 100) - Math.round(changeValue * 100)) /
        100;
    });
  }
  const currencyNameMap = {
    PENNY: "Pennies",
    NICKEL: "Nickels",
    DIME: "Dimes",
    QUARTER: "Quarters",
    ONE: "Ones",
    FIVE: "Fives",
    TEN: "Tens",
    TWENTY: "Twenties",
    "ONE HUNDRED": "Hundreds",
  };
  cash.value = "";
  drawer.innerHTML = `<p><strong>Change in drawer:</strong></p>
    ${cid
      .map(
        ([currName, value]) => `<p>${currencyNameMap[currName]}: $${value}</p>`
      )
      .join("")}
  `;
}

const checkResults = () => {
  if (!cash.value) {
    return;
  }
  checkCashRegister();
};

button.addEventListener("click", () => {
  checkCashRegister();
});
cash.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkResults();
  }
});
updateDisplay([]);
