// app.js

const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=5';

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
  const modalContainer = document.getElementById('modal-container');

  // Create modal content
  const modalContent = `
    <div class="modal fade" id="pokemonModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${pokemon.name}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Type: ${pokemon.types.map((type) => type.type.name).join(', ')}</p>
            </div>
        </div>
      </div>
    </div>
  `;

  // Inject modal content into the modal container
  modalContainer.innerHTML = modalContent;

  // Show the modal
  $('#pokemonModal').modal('show');
}

// Call the function to populate the Pokémon list with customized Bootstrap buttons
populatePokemonList();
