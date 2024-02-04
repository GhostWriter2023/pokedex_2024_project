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
        modal.classList.add('modal', 'fade'); // Bootstrap modal classes

        let modalDialog = document.createElement('div');
        modalDialog.classList.add('modal-dialog');

        let modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        let modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-header');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('close');
        closeButtonElement.setAttribute('data-dismiss', 'modal'); // Bootstrap dismiss attribute
        closeButtonElement.innerHTML = '&times;';

        let titleElement = document.createElement('h5');
        titleElement.classList.add('modal-title');
        const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);
        titleElement.innerText = capitalizedTitle;

        let modalBody = document.createElement('div');
        modalBody.classList.add('modal-body');

        let contentElement = document.createElement('p');
        contentElement.innerText = text;

        let imageElement = document.createElement("img");
        imageElement.setAttribute("src", img);
        imageElement.setAttribute("width", "250");
        imageElement.setAttribute("height", "250");

        let modalFooter = document.createElement('div');
        modalFooter.classList.add('modal-footer');

        modalHeader.appendChild(closeButtonElement);
        modalHeader.appendChild(titleElement);
        modalBody.appendChild(contentElement);
        modalBody.appendChild(imageElement);
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);
        modalDialog.appendChild(modalContent);
        modal.appendChild(modalDialog);
        modalContainer.appendChild(modal);

        $('#modal-container.modal').modal('show'); // Bootstrap modal show method
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
        listpokemon.classList.add('list-group-item'); // Bootstrap list-group-item class
        let button = document.createElement('button');
        const capitalizedPokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        button.innerText = capitalizedPokemonName;
        button.classList.add('btn', 'btn-primary');
        
        // Add data-toggle and data-target attributes for Bootstrap modal
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#modal-container');
        
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

    async function showDetails(item) {
        try {
            await pokemonRepository.loadDetails(item);
            const formattedHeight = (item.height / 10).toFixed(1);
            const formattedWeight = (item.weight / 10).toFixed(1);
            showModal(item.name, `Height: ${formattedHeight} m and Weight: ${formattedWeight} kg`, item.imageUrl);
        } catch (error) {
            console.error(error);
        }
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
