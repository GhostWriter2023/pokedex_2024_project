let pokemonRepository = (function () {
  // Set up a private variable to store and control access to the pokemonList array
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=950';

  // Function to show and log loading message
  function showLoadingMessage() {
    let loadingMessageElement = document.getElementById('loading-message');
    loadingMessageElement.classList.add('visible');
    console.log('Loading...');
  }

  // Function to hide loading message and log when completed
  function hideLoadingMessage() {
    let loadingMessageElement = document.getElementById('loading-message');
    loadingMessageElement.classList.remove('visible');
    console.log('Loading complete.');
  }

  // Public functions   
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
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
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  }

  function loadList() {
    showLoadingMessage(); // Show loading message before starting to load the list
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    }).finally(function () {
      hideLoadingMessage(); // Hide loading message when the list loading is complete
    });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    showLoadingMessage(); // Show loading message before starting to load details
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // adding the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    }).finally(function () {
      hideLoadingMessage(); // Hide loading message when details loading is complete
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
