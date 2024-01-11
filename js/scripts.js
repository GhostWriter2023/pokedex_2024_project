let pokemonList = [
  { name: 'Charizard', height: 1.7, types: ['sky', 'fire'] },
  { name: 'Tyranitar', height: 2, types: ['land', 'rock'] },
  { name: 'Sharpedo', height: 1.8, types: ['water', 'sea'] }
];

// For Loop to cycle through each item in pokemonList followed by command to display
for (let i = 0; i < pokemonList.length; i++) {
  let threePokemon = pokemonList[i];
  // Function to check if the height is above 1.9
  let tallPokemon = threePokemon.height > 1.9;
  if (tallPokemon) {
    document.write('<strong>' + threePokemon.name + ' (height: ' + threePokemon.height + ') - Wow, that’s big!</strong><br>');
  } else {
    document.write(threePokemon.name + ' (height: ' + threePokemon.height + ')<br>');
  }
}
