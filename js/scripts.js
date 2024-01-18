let pokemonRepository = (function () {
  // Set up a private variable to store and control access to the pokemonList array
  let pokemonList = [
    { name: 'Charizard', height: 1.7, types: ['sky', 'fire'] },
    { name: 'Tyranitar', height: 2, types: ['land', 'rock'] },
    { name: 'Sharpedo', height: 1.8, types: ['water', 'dark'] }
  ];

  // Public functions
  return {
    getAll: function () {
      return pokemonList;
    },
    add: function (item) {
      // Check if entered item is a valid Pokemon object
      if (typeof item === 'object' && item.hasOwnProperty('name') && item.hasOwnProperty('height') && item.hasOwnProperty('types')) {
        pokemonList.push(item);
        console.log('${item.name} added to the pokemonList.');
      } else {
        console.error('Invalid Pokemon object. Please provide a valid Pokemon with name, height, and types.');
      }
    }
  };
})();

// Adding a new Pokemon
let newPokemon = { name: 'Pikachu', height: 0.4, types: ['water', 'electric'] };
pokemonRepository.add(newPokemon);

// Test to observe the validity function work by adding another Pokemon, but with data missing
let secondPokemon = {height: 0.4, types: ['water', 'electric'] };
pokemonRepository.add(secondPokemon);

  pokemonRepository.getAll().forEach((pokemon) => {
  // Function to check if the height is above 1.9
  let tallPokemon = pokemon.height > 1.9;

  if (tallPokemon) {
    document.write(`<strong>${pokemon.name} (height: ${pokemon.height}) - Wow, that’s big!</strong><br>`);
  } else {
    document.write(`${pokemon.name} (height: ${pokemon.height})<br>`);
  }
});

/* Original For Loop
for (let i = 0; i < pokemonList.length; i++) {
  let threePokemon = pokemonList[i];

  let tallPokemon = threePokemon.height > 1.9;
  if (tallPokemon) {
    document.write('<strong>' + threePokemon.name + ' (height: ' + threePokemon.height + ') - Wow, that’s big!</strong><br>');
  } else {
    document.write(threePokemon.name + ' (height: ' + threePokemon.height + ')<br>');
  }
}
*/

