document.addEventListener("DOMContentLoaded",function(){document.getElementById("myBtn").style.display="block",document.getElementById("myBtn").addEventListener("click",function(){document.body.scrollTop=0,document.documentElement.scrollTop=0})});let pokemonRepository=function(){let e=[];function t(){return e}let n=async function(){try{let e=await fetch("https://pokeapi.co/api/v2/pokemon/?limit=950"),t=await e.json();return t.results}catch(n){return console.error("Error fetching Pok\xe9mon data:",n),[]}},o=async function(){let e=document.querySelector(".pokemon-list"),t=await n(),o=Math.ceil(t.length/4),a=[];[0,1,2,3].forEach(()=>{let e=document.createElement("div");e.className="col",a.push(e)}),t.forEach((e,t)=>{let n=e.name;e.name.includes("-")&&"ho-oh"!==e.name.toLowerCase()&&(n=e.name.split("-")[0]);let c=n.charAt(0).toUpperCase()+n.slice(1),i=document.createElement("button");i.className="btn btn-primary custom-button",i.textContent=c,i.style.width="150px",i.addEventListener("click",async()=>{let t=await l(e.url);r(t)}),a[Math.floor(t/o)].appendChild(i)});let c=document.createElement("div");c.className="row",a.forEach(e=>{c.appendChild(e)}),e.appendChild(c)},a=function(){let e=document.getElementById("searchInput").value.toLowerCase(),t=document.querySelectorAll(".custom-button"),n=document.getElementById("clearSearchButton");t.forEach(t=>{let n=t.textContent.toLowerCase();n.startsWith(e)?t.style.display="block":t.style.display="none"}),n.textContent="Clear Search"};document.getElementById("searchInput").addEventListener("keyup",a),document.getElementById("clearSearchButton").addEventListener("click",function(){document.getElementById("searchInput").value="",a()});let l=async function(e){try{let t=await fetch(e),n=await t.json();return n}catch(o){return console.error("Error fetching full Pok\xe9mon data:",o),null}},r=function(e){let t=e.name.charAt(0).toUpperCase()+e.name.slice(1),n=e.height/10,o=e.weight/10;$("#exampleModalLabel").text(t),$(".modal-title").html(`
		<h1> ${t}</h1>`),$(".modal-body").html(`
		<p><strong>Height:</strong> ${n} m</p>
		<p><strong>Weight:</strong> ${o} kg</p>
		<p><strong>Type:</strong> ${e.types.map(e=>e.type.name).join(", ")}</p>
		<img src='${e.sprites.front_default}' alt='Front View'>
		${e.sprites.back_default?`<img src='${e.sprites.back_default}' alt='Back View'>`:""}
	  `),!function e(t){let n=document.querySelector(".modal-dialog");n.style.maxWidth=t}("275px"),$("#exampleModal").modal("show")};return{getAll:t,fetchPokemonData:n,populatePokemonList:o,handleSearch:a,fetchFullPokemonData:l,openPokemonModal:r}}();pokemonRepository.populatePokemonList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.fetchFullPokemonData()})});