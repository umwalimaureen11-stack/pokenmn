const input = document.querySelector("#pokemonInput");
const button = document.querySelector("#searchBtn");
const pokemonCard = document.querySelector("#pokemonCard");
const loading = document.querySelector("#loading");
const errorDiv = document.querySelector("#error");
const toggleDark = document.querySelector("#toggleDark");

const API_URL = "https://pokeapi.co/api/v2/pokemon/";
// 🌙 Dark Mode Toggle
toggleDark.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});

// Search on button click
button.addEventListener("click", fetchPokemon);

// Search on Enter key
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    fetchPokemon();
  }
});

// 🔎 Fetch Pokémon Function
async function fetchPokemon() {
  const pokemonName = input.value.trim().toLowerCase();
  if (!pokemonName) return;

  pokemonCard.innerHTML = "";
  errorDiv.classList.add("hidden");

  loading.classList.remove("hidden");
  button.disabled = true;

  try {
    const response = await fetch(API_URL + pokemonName);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Pokémon not found!");
      } else {
        throw new Error("Something went wrong. Please try again.");
      }
    }

    const data = await response.json();
    displayPokemon(data);

  } catch (error) {
    errorDiv.textContent = error.message;
    errorDiv.classList.remove("hidden");
  } finally {
    loading.classList.add("hidden");
    button.disabled = false;
  }
}
