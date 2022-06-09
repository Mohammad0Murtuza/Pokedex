const poke_container = document.getElementById('poke-container');
const poke_count = 898;
const colors = {
	fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}
const main_types = Object.keys(colors);

const fetchPokemons = async () => {
	for (let i = 1; i <= poke_count; i++) {
		await getPokemons(i);
	}
}

const getPokemons = async (id) =>{
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const data = await res.json();
	createPokemonCard(data);
}

const createPokemonCard =(pokemon) =>{
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');

	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const id = pokemon.id.toString().padStart(3, '0');
	const poke_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	const color = colors[type];
	const attackNumber = pokemon.moves[Math.floor(Math.random()*pokemon.moves.length)];
	const attack = attackNumber.move.name;

	pokemonEl.style.backgroundColor = color;

	const pokemonInnerHTML =`
		<div class="image-container">
			<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="">
		</div>
		<div class="info">
			<span class="number">#${id}</span>
			<h3 class="name">${name}</h3>
			<h4 class="type">Type: <span>${type}</span></h4>
			<h4 class="attack">Random Attack: <span>${attack}</span></h4>
		</div>
	`

	pokemonEl.innerHTML = pokemonInnerHTML;
	poke_container.appendChild(pokemonEl);
}



fetchPokemons();

