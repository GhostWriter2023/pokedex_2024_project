// Scroll down button
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('myBtn').style.display = 'block';
	document.getElementById('myBtn').addEventListener('click', function () {
		// When the user clicks on the button, scroll to the top of the document
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
	});
});

let pokemonRepository = (function () {
	let pokemonList = [];

	const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=950';	

	function add(pokemon) {
	  pokemonList.push(pokemon);
	}
  
	function getAll() {
	  return pokemonList;
	}

	// Function to fetch Pokémon data from the API
	const fetchPokemonData = async function(){
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
  	const populatePokemonList = async function(){
		const pokemonListContainer = document.querySelector('.pokemon-list');
		const pokemonData = await fetchPokemonData();
		const buttonsPerColumn = Math.ceil(pokemonData.length / 4); // Divide the number of Pokémon buttons by 4 to determine the number of buttons per column
	
		let columnDivs = []; // Array to hold column div elements
	
		[0, 1, 2, 3].forEach(() => { 
			const columnDiv = document.createElement('div'); // Create a column div for each column
			columnDiv.className = 'col'; // Use Bootstrap column class
			columnDivs.push(columnDiv); // Add column div to the array
		});
	
		pokemonData.forEach((pokemon, index) => {
			let primaryName = pokemon.name; // Default to the original name
			if (pokemon.name.includes('-') && pokemon.name.toLowerCase() !== 'ho-oh') {
				// Check if the name contains a hyphen and is not 'Ho-Oh'
				primaryName = pokemon.name.split('-')[0]; // Split the name by hyphen and take the first part
			}
			// Capitalize the primary name
			const capitalizedPokemonName =
				primaryName.charAt(0).toUpperCase() + primaryName.slice(1);
	
			const button = document.createElement('button');
			button.className = 'btn btn-primary custom-button';
			button.textContent = capitalizedPokemonName; // Set the button text content to the capitalized primary name
			button.style.width = '150px';
			button.addEventListener('click', async () => {
				const fullPokemonData = await fetchFullPokemonData(pokemon.url);
				openPokemonModal(fullPokemonData);
			});
	
			// Determine which column div to append the button to based on the index
			const columnDivIndex = Math.floor(index / buttonsPerColumn);
			columnDivs[columnDivIndex].appendChild(button);
		});
	
		const rowDiv = document.createElement('div'); // Create a row div to contain all the column divs
		rowDiv.className = 'row'; // Use Bootstrap row class
		columnDivs.forEach((columnDiv) => {
			// Append each column div to the row div
			rowDiv.appendChild(columnDiv);
		});
	
		pokemonListContainer.appendChild(rowDiv); // Append the row div to the Pokémon list container
	}
	
	// Function to handle search functionality
	const handleSearch = function(){
			const searchInput = document
			.getElementById('searchInput')
			.value.toLowerCase(); // Get search input and convert to lowercase
		const buttons = document.querySelectorAll('.custom-button'); // Get all Pokémon buttons
		const clearSearchButton = document.getElementById('clearSearchButton');
	
		buttons.forEach((button) => {
			const pokemonName = button.textContent.toLowerCase(); // Get Pokémon name from button and convert to lowercase
			if (pokemonName.startsWith(searchInput)) {
				button.style.display = 'block'; // Show button if the Pokémon name starts with the search input
			} else {
				button.style.display = 'none'; // Hide button if the Pokémon name does not match the search input
			}
		});
	
		clearSearchButton.textContent = 'Clear Search'; // Change the search button to clear search button
	}
	
	document.getElementById('searchInput').addEventListener('keyup', handleSearch); // Event listener for search input keyup event
	
	document
		.getElementById('clearSearchButton')
		.addEventListener('click', function () {
			// Event listener for clear search button click
			document.getElementById('searchInput').value = ''; // Clear search input
			handleSearch(); // Call handleSearch to reset the Pokémon list
		});
		}

		// Function to fetch full Pokémon data
		const fetchFullPokemonData = async function(pokemonUrl){
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
		const openPokemonModal = function(pokemon){
			const capitalizedPokemonName =
			pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
		const heightInMeters = pokemon.height / 10;
		const weightInKilograms = pokemon.weight / 10;
		// Update the modal title and content using jQuery
		$('#exampleModalLabel').text(capitalizedPokemonName);
		$('.modal-title').html(`
	  <h1> ${capitalizedPokemonName}</h1>`);
		$('.modal-body').html(`
	  <p><strong>Height:</strong> ${heightInMeters} m</p>
	  <p><strong>Weight:</strong> ${weightInKilograms} kg</p>
	  <p><strong>Type:</strong> ${pokemon.types.map((type) => type.type.name).join(', ')}</p>
	  <img src='${pokemon.sprites.front_default}' alt='Front View'>
	  ${pokemon.sprites.back_default ? `<img src='${pokemon.sprites.back_default}' alt='Back View'>` : ''}
	`);
	
		function changeModalWidth(newWidth) {
			const modalDialog = document.querySelector('.modal-dialog'); // Get the modal dialog element
			modalDialog.style.maxWidth = newWidth; // Set the new width
		}
		changeModalWidth('275px');
	
		$('#exampleModal').modal('show'); // Show the modal
	}

	return {
	  add: add,
	  getAll: getAll,
	  fetchPokemonData: fetchPokemonData,
	  populatePokemonList: populatePokemonList,
	  handleSearch: handleSearch,
	  fetchFullPokemonData: fetchFullPokemonData,
	  openPokemonModal: openPokemonModal,
	};
  })();

  /* Load Pokemon List
pokemonRepository.populatePokemonList().then(function() {
	// Write Pokemon List to the DOM
	pokemonRepository.getAll().forEach(function (pokemon) {
	  pokemonRepository.fetchFullPokemonData();
	});
  });
*/
