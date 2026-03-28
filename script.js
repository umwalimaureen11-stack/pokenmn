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
// 🎴 Display Pokémon Card
function displayPokemon(data) {
  const name =
    data.name.charAt(0).toUpperCase() + data.name.slice(1);

  const id = `#${data.id.toString().padStart(3, "0")}`;
  const height = data.height / 10;
  const weight = data.weight / 10;

  const card = document.createElement("div");

  card.classList.add(
    "bg-gradient-to-br",
    "from-indigo-100",
    "to-purple-200",
    "dark:from-gray-700",
    "dark:to-gray-600",
    "rounded-2xl",
    "p-4",
    "sm:p-6",
    "shadow-xl",
    "transform",
    "transition",
    "duration-500",
    "hover:scale-105"
  );
 card.innerHTML = `
    <div class="text-center">

      <h2 class="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
        ${name} ${id}
      </h2>

      <!-- ✅ Responsive Sprite Section -->
      <div class="flex flex-wrap justify-center gap-4 mb-4">
        <img src="${data.sprites.front_default}" 
             alt="${name}"
             class="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
             
        <img src="${data.sprites.back_default}" 
             alt="${name}"
             class="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
             
        <img src="${data.sprites.front_shiny}" 
             alt="${name}"
             class="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
      </div>

      <p class="text-sm sm:text-base"><strong>Height:</strong> ${height} m</p>
      <p class="text-sm sm:text-base"><strong>Weight:</strong> ${weight} kg</p>
      <p class="text-sm sm:text-base"><strong>Base Experience:</strong> ${data.base_experience}</p>

      <div class="mt-4">
        <strong>Types:</strong>
        <div class="flex flex-wrap justify-center gap-2 mt-2">
          ${data.types
            .map(
              (type) => `
              <span class="px-3 py-1 bg-indigo-600 text-white rounded-full text-xs sm:text-sm">
                ${type.type.name}
              </span>
            `
            )
            .join("")}
        </div>
      </div>

    </div>
  `;

  pokemonCard.appendChild(card);
}