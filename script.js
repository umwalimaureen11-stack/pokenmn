const input = document.querySelector("#pokemonInput");
const button = document.querySelector("#searchBtn");
const pokemonCard = document.querySelector("#pokemonCard");
const loading = document.querySelector("#loading");
const errorDiv = document.querySelector("#error");
const toggleDark = document.querySelector("#toggleDark");

const API_URL = "https://pokeapi.co/api/v2/pokemon/";