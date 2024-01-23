let pokemonRepository = (function () {
  // Set up a private variable to store and control access to the pokemonList array
  let pokemonList = [
    { name: 'Charizard', height: 1.7, types: ['sky', 'fire'] },
    { name: 'Tyranitar', height: 2, types: ['land', 'rock'] },
    { name: 'Sharpedo', height: 1.8, types: ['water', 'dark'] }
  ];

// Public functions
function add(pokemon) {
  if (
    typeof pokemon === 'object' &&
    'name' in pokemon &&
    'height' in pokemon &&
    'types' in pokemon
  ) {
    pokemonList.push(pokemon);
  } else {
    console.log('pokemon is not correct');
  }
}

function getAll() {
  return pokemonList;
}

function addListItem(pokemon) {
  let pokemonList = document.querySelector('.pokemon-list');
  let listpokemon = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classList.add('button-class');
  listpokemon.appendChild(button);
  pokemonList.appendChild(listpokemon);
  button.addEventListener('click', function () {
    showDetails(pokemon);
  });
}

function showDetails(pokemon) {
  console.log(pokemon)
}

return {
  add: add,
  getAll: getAll,
  addListItem: addListItem
};
})();

// Adding a new Pokemon
pokemonRepository.add({ name: 'Pikachu', height: 0.4, types: ['water', 'electric'] });
// Test to observe the validity function work by adding another Pokemon, but with data missing
let secondPokemon = { height: 0.4, types: ['water', 'electric'] };
pokemonRepository.add(secondPokemon);

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
pokemonRepository.addListItem(pokemon);

// Function to check if the height is above 1.9
let tallPokemon = pokemon.height > 1.9;

if (tallPokemon) {
  document.write('<strong>' + pokemon.name + '</strong><strong> (height: ' + pokemon.height + '</strong>) <strong> - Wow, that’s big!</strong><br>');
} else {
  document.write(pokemon.name + ' (height: ' + pokemon.height + ')<br>');
}
});

