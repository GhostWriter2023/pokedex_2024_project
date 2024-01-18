let pokemonList = [
  { name: 'Charizard', height: 1.7, types: ['sky', 'fire'] },
  { name: 'Tyranitar', height: 2, types: ['land', 'rock'] },
  { name: 'Sharpedo', height: 1.8, types: ['water', 'sea'] }
];

// Updated to a forEach function to cycle through each item in pokemonList followed by command to display
pokemonList.forEach((pokemon) => {
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

