const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=950';

// Scroll down button
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("myBtn").style.display = "block";
  // When the user clicks on the button, scroll to the top of the document
  document.getElementById("myBtn").addEventListener("click", function () {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  });
});

// Function to fetch Pokémon data from the API
async function fetchPokemonData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    return [];
  }
}

// Function to populate Pokémon list with customized Bootstrap buttons
async function populatePokemonList() {
  const pokemonListContainer = document.querySelector('.pokemon-list');
  const pokemonData = await fetchPokemonData();

  pokemonData.forEach((pokemon) => {
    const button = document.createElement('button');
    button.className = 'btn btn-primary custom-button';
    const capitalizedPokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    button.textContent = capitalizedPokemonName;
    button.style.width = '150px';
    button.addEventListener('click', async () => {
      const fullPokemonData = await fetchFullPokemonData(pokemon.url);
      openPokemonModal(fullPokemonData);
    });

    pokemonListContainer.appendChild(button);
  });
}

// Function to fetch full Pokémon data
async function fetchFullPokemonData(pokemonUrl) {
  try {
    const response = await fetch(pokemonUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching full Pokémon data:', error);
    return null;
  }
}

// Function to open Pokémon modal
function openPokemonModal(pokemon) {
  // Update the modal title and content using jQuery
  $('#exampleModalLabel').text(pokemon.name);
  $('.modal-body').html(`
  <h2> ${pokemon.name}</h2>
  <p><strong>Height:</strong> ${pokemon.height}</p>
  <p><strong>Weight:</strong> ${pokemon.weight}</p>
  <p><strong>Type:</strong> ${pokemon.types.map((type) => type.type.name).join(', ')}</p>
  <img src="${pokemon.sprites.front_default}" alt="Front View">
  <img src="${pokemon.sprites.back_default}" alt="Back View">
  `);

  // Show the modal
  $('#exampleModal').modal('show');
}

// Call the function to populate the Pokémon list with customized Bootstrap buttons
populatePokemonList();
