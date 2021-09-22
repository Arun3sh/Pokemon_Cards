let allPokemon = [];
// var strdata = [];
let userInput = document.querySelector('#searchType');
const url = ' https://pokeapi.co/api/v2/pokemon/';
const typeColor = {
	bug: '#26de81',
	dragon: '#ffeaa7',
	electric: '#fed330',
	fairy: '#FF0069',
	fighting: '#30336b',
	fire: '#f0932b',
	flying: '#81ecec',
	grass: '#00b894',
	ground: '#EFB549',
	ghost: '#a55eea',
	ice: '#74b9ff',
	normal: '#95afc0',
	poison: '#6c5ce7',
	psychic: '#a29bfe',
	rock: '#2d3436',
	water: '#0190FF',
	steel: '#494b4d',
};

const pokecards = document.querySelector('.pokecards');

let getPokeData = async (a, b) => {
	// Using for loop to get all 225 Pokemon
	for (let i = a; i <= b; i++) {
		var finalUrl = url + i;
		const res = await fetch(finalUrl);
		const data = await res.json();
		strdata = data;
		var typeArr = [];
		var abilityArr = [];
		try {
			// to store type
			if (data.types.length > 1) {
				var typ = data.types;
				let i = 0;

				typ.forEach((element) => {
					typeArr[i] = element.type.name;
					i++;
				});
			} else {
				typeArr[0] = data.types[0].type.name;
			}

			//To store Abilities of Pokemon
			if (data.abilities.length > 1) {
				var typ = data.abilities;
				let i = 0;
				typ.forEach((element) => {
					abilityArr[i] = element.ability.name;
					i++;
				});
			} else {
				abilityArr[0] = data.abilities[0].ability.name;
			}
		} catch (err) {
			console.log(err.message);
		}

		// Storing required data in another array
		allPokemon[i - 1] = {
			Name: `${data.name}`,
			Id: `${data.id}`,
			Type: [`${typeArr[0]}`, `${typeArr[1]}`],
			Ability: [`${abilityArr[0]}`, `${abilityArr[1]}`],
			Hp: `${data.stats[0].base_stat}`,
			Attack: `${data.stats[1].base_stat}`,
			Defence: `${data.stats[2].base_stat}`,
			'Sp.Attack': `${data.stats[3].base_stat}`,
			'Sp.Defence': `${data.stats[4].base_stat}`,
			Speed: `${data.stats[5].base_stat}`,
		};
	}

	// 226 - 450;
	// //Using for loop to get all 225 Pokemon
	// for (let i = 226; i <= 450; i++) {
	// 	var finalUrl = url + i;
	// 	const res = await fetch(finalUrl);
	// 	const data = await res.json();

	// 	// Storing required data in another array
	// 	allPokemon[i - 1] = {
	// 		Name: `${data.name}`,
	// 		Id: `${data.id}`,
	// 		Type: `${data.types}`,
	// 		Ability: `${data.abilities}`,
	// 		Hp: `${data.stats[0].base_stat}`,
	// 		Attack: `${data.stats[1].base_stat}`,
	// 		Defence: `${data.stats[2].base_stat}`,
	// 		'Sp.Attack': `${data.stats[3].base_stat}`,
	// 		'Sp.Defence': `${data.stats[4].base_stat}`,
	// 		Speed: `${data.stats[5].base_stat}`,
	// 	};
	// }

	// // 451-675
	// // Using for loop to get all 225 Pokemon
	// for (let i = 451; i <= 675; i++) {
	// 	var finalUrl = url + i;
	// 	const res = await fetch(finalUrl);
	// 	const data = await res.json();

	// 	// Storing required data in another array
	// 	allPokemon[i - 1] = {
	// 		Name: `${data.name}`,
	// 		Id: `${data.id}`,
	// 		Type: `${data.types}`,
	// 		Ability: `${data.abilities}`,
	// 		Hp: `${data.stats[0].base_stat}`,
	// 		Attack: `${data.stats[1].base_stat}`,
	// 		Defence: `${data.stats[2].base_stat}`,
	// 		'Sp.Attack': `${data.stats[3].base_stat}`,
	// 		'Sp.Defence': `${data.stats[4].base_stat}`,
	// 		Speed: `${data.stats[5].base_stat}`,
	// 	};
	// }

	// //676-898
	// // Using for loop to get all 225 Pokemon
	// for (let i = 676; i <= 898; i++) {
	// 	var finalUrl = url + i;
	// 	const res = await fetch(finalUrl);
	// 	const data = await res.json();

	// 	// Storing required data in another array
	// 	allPokemon[i - 1] = {
	// 		Name: `${data.name}`,
	// 		Id: `${data.id}`,
	// 		Type: `${data.types}`,
	// 		Ability: `${data.abilities}`,
	// 		Hp: `${data.stats[0].base_stat}`,
	// 		Attack: `${data.stats[1].base_stat}`,
	// 		Defence: `${data.stats[2].base_stat}`,
	// 		'Sp.Attack': `${data.stats[3].base_stat}`,
	// 		'Sp.Defence': `${data.stats[4].base_stat}`,
	// 		Speed: `${data.stats[5].base_stat}`,
	// 	};
	// }

	//generateCard(userInput);
};

function getJSONData() {
	getPokeData(1, 150);
	getPokeData(151, 300);
	getPokeData(301, 450);
	getPokeData(451, 600);
	getPokeData(601, 750);
	getPokeData(751, 898);
	console.log('ready');
}

function generateCard() {
	var searchThis = userInput.value;
	var print = allPokemon.filter(
		(e) => e.Type[0] == searchThis || e.Type[1] == searchThis
	);

	console.log(print);
	let newEntry = '';
	pokecards.innerHTML = '';

	// Set themeColor based on pokemon type
	const themeColor = typeColor[userInput];

	print.forEach((card) => {
		let urlValue;
		const themeColor = typeColor[card.Type[0]];
		if (card.Id.length == 1) {
			urlValue = `00${card.Id}`;
		} else if (card.Id.length == 2) {
			urlValue = `0${card.Id}`;
		} else {
			urlValue = `${card.Id}`;
		}
		newEntry += `
		<div class="card" id="forColor" style="background:radial-gradient(circle at 50% 0%, ${themeColor} 36%, #ffffff 36%)">
		<p class="hp">
		<span>HP</span>
			${card.Hp}
		</p>
		<img class="card-img-top" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${urlValue}.png" />
		<h2 class="card-title">${card.Name}</h2>
		<div class="types"></div>

		</div>`;

		// styleCard(themeColor);
	});
	pokecards.innerHTML = newEntry;
	for (var i in print) {
		appendTypes(print[i], i);
	}
}

let appendTypes = (types, a) => {
	var typeData = types.Type;
	var htmlTypeData = document.querySelectorAll('.types');

	for (var i in typeData) {
		try {
			console.log('1');
			if (typeData[i] != 'undefined') {
				let span = document.createElement('span');
				span.style.backgroundColor = typeColor[typeData[i]];
				span.innerHTML = typeData[i] + ' ';
				htmlTypeData[a].appendChild(span);
			}
		} catch (error) {
			console.log(error.message);
		}
	}
};

window.onload = getJSONData;
