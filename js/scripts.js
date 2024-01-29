let pokemonRepository = (function () {
  // Set up a private variable to store and control access to the pokemonList array
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=950';
  let modalContainer = document.querySelector('#modal-container');

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

  // Function defining modal content
  function showModal(title, text, img) {
      modalContainer.innerHTML = ''; // Clear all existing modal content

      let modal = document.createElement('div');
      modal.classList.add('modal');

      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);

      let titleElement = document.createElement('h1');
      const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);
      titleElement.innerText = capitalizedTitle;

      let contentElement = document.createElement('p');
      contentElement.innerText = text;

      let imageElement = document.createElement("img");
      imageElement.setAttribute("src", img);
      imageElement.setAttribute("width", "250");
      imageElement.setAttribute("height", "250");

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modal.appendChild(imageElement);
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');
  }

  function hideModal() {
      modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();
      }
  });

  modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
          hideModal();
      }
  });

  // functions to manage pokemonList   
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
      const capitalizedPokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      button.innerText = capitalizedPokemonName;
      button.classList.add('button-class');
      listpokemon.appendChild(button);
      pokemonList.appendChild(listpokemon);
      button.addEventListener('click', function () {
          showDetails(pokemon);
      });
  }

  function loadList(pokemon) {
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
          item.weight = details.weight;
          console.log(details);
      }).catch(function (e) {
          console.error(e);
      }).finally(function () {
          hideLoadingMessage(); // Hide loading message when details loading is complete
      });
  }

  function showDetails(item) {
      pokemonRepository.loadDetails(item).then(function () {
          const formattedHeight = (item.height / 10).toFixed(1);
          const formattedWeight = (item.weight / 10).toFixed(1); // height and weight were missing a decimal point e.g. was displaying 69 instead of 6.9
          showModal(item.name, `Height: ${formattedHeight} m and Weight: ${formattedWeight} kg`, item.imageUrl);
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
