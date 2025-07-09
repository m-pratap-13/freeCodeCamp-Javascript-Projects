const input = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonId = document.getElementById("creature-id");
const pokemonName = document.getElementById("creature-name");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const pokemonTypes = document.querySelector("#pokemon-types");
const specialName = document.getElementById("special-name");
const specialDescription = document.getElementById("special-description");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defence = document.getElementById("defense");
const specialDefense = document.getElementById("special-defense");
const specialAttack = document.getElementById("special-attack");
const speed = document.getElementById("speed");
const tableBody = document.querySelector("tbody");

function fetchPokemon() {
  const search = input.value;
  fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${search}`)
    .then((res) => res.json())
    .then((data) => displayData(data))
    .catch(() => alert("Creature not found"));
}
function displayData(data) {
  pokemonId.innerText = `#${data.id}`;
  pokemonName.innerText = `${data.name}`;
  weight.innerText = `Weight: ${data.weight}`;
  height.innerText = `Height: ${data.height}`;
  specialName.innerText = data.special.name;
  specialDescription.innerText = data.special.description;
  hp.innerText = data.stats[0].base_stat;
  attack.innerText = data.stats[1].base_stat;
  defence.innerText = data.stats[2].base_stat;
  specialAttack.innerText = data.stats[3].base_stat;
  specialDefense.innerText = data.stats[4].base_stat;
  speed.innerText = data.stats[5].base_stat;
  pokemonTypes.innerHTML = "";
  data.types.forEach(
    (type) =>
      (pokemonTypes.innerHTML += `<div class="type" style="background-color: #78cc55">${capitalizeFirstLetter(
        type.name
      )}</div>`)
  );
}

searchButton.addEventListener("click", () => {
  fetchPokemon();
});

function capitalizeFirstLetter(str) {
  return str[0].toUpperCase() + str.slice(1);
}
