// To store all the required data
let allPokemon = [];

// To get the user input
let userInput = document.querySelector('#searchType');

// URL of the API at the end a numeric value is required to get the specific pokemon data
const url = ' https://pokeapi.co/api/v2/pokemon/';

// To use background color based on their type
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
	dark: '#56647D',
};

// To traverse and print the desired stat data on the div
const statName = [
	'Attack',
	'Defence',
	'Special Attack',
	'Special Defence',
	'Speed',
];

// To traverse and print the desired basic data on the div
const details = ['Id', 'Ability', 'Height', 'Weight'];

// In this pokecards div all the pokemon info are printed
const pokecards = document.querySelector('.pokecards');

// to get all the pokemon's required data from the api
// a,b are passed from getJson data ()
let getPokeData = async (a, b) => {
	// Using for loop to get Pokemon from a to b
	for (let i = a; i <= b; i++) {
		// the final url is combined with the value of i
		// eg - https://pokeapi.co/api/v2/pokemon/1 is the url and the 1 is replaced during every iteration
		var finalUrl = url + i;

		// the response for the fetch is stored
		const res = await fetch(finalUrl);

		// response is parsed to json data
		const data = await res.json();

		var typeArr = [];
		var abilityArr = [];
		// the ability and type for some pokemon are 2. So doing iteration if nescessary
		try {
			// for getting type
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
				let j = 0;
				typ.forEach((element) => {
					abilityArr[j] = element.ability.name;
					j++;
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
			'Special Attack': `${data.stats[3].base_stat}`,
			'Special Defence': `${data.stats[4].base_stat}`,
			Speed: `${data.stats[5].base_stat}`,
			Height: `${data.height}`,
			Weight: `${data.weight}`,
		};
	}
};

// to reduce the time for displaying the result from 898 pokemon
// the data is fetched simutaneously and to print available data
function getJSONData() {
	getPokeData(1, 150);
	getPokeData(151, 300);
	getPokeData(301, 450);
	getPokeData(451, 600);
	getPokeData(601, 750);
	getPokeData(751, 898);
	console.log('ready');
}

// In here the result is generated
function generateCard(userInput) {
	// here the useriput is converetd into lowercase as it matched in the JSON data
	var searchThis = userInput.toLowerCase();

	// The data is filtered based on userInput and to display
	var print = allPokemon.filter(
		(e) =>
			e.Type[0] == searchThis || e.Type[1] == searchThis || e.Name == searchThis
	);

	// incase user searched for another data again we have to clear the div holding previous values
	pokecards.innerHTML = '';

	if (print != 0) {
		// Div tags and requires tags are created for displaying
		print.forEach((card) => {
			// 3 functions are used to get their respective view data
			let mainContentDiv = mainContent(card);
			let statContent = statsContent(card);
			let otherContent = othersContent(card);

			let otherdetails = `<div class="other skewHolder">
		<div class="skewingLeft">${otherContent}</div>
		</div>`;

			let statdetails = `<div class="stat skewHolder">
		<div class="skewingRight">${statContent}</div>
		</div>`;

			let eachPoke = `<div class="allPoke">
			${otherdetails}
			${mainContentDiv}
			${statdetails}
		</div>`;
			pokecards.innerHTML += eachPoke;
		});

		for (var i in print) {
			// To append the type of pokemon value and color based on their type
			appendTypes(print[i], i);
		}
	} else {
		alert('Kindly enter a valid pokemon name or pokemon type');
	}
}

function othersContent(card) {
	var detailsContent = '';
	details.forEach((o) => {
		if (o == 'Ability') {
			if (card[o][1] == 'undefined') {
				card[o].pop();
			}
		}
		let value = card[o];
		detailsContent += `<div class="row ">
		<label for="otherDetails" id="detailsLabel">${o}</label>
	
		<p id="otherDetails">${value}</p>
	</div>`;
	});
	return detailsContent;
}

function mainContent(card) {
	let urlValue;
	const themeColor = typeColor[card.Type[0]];
	if (card.Id.length == 1) {
		urlValue = `00${card.Id}`;
	} else if (card.Id.length == 2) {
		urlValue = `0${card.Id}`;
	} else {
		urlValue = `${card.Id}`;
	}

	// Main Detail of Pokemon
	let mainConetent = `
		<div class="toHold">
		<div class="cards" id="forColor" style="background:radial-gradient(circle at 50% 0%, ${themeColor} 36%, #ffffff 36%)">
		<p class="hp">
		<span>HP</span>
			${card.Hp}
		</p>
		<img class="card-img-top" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${urlValue}.png" />
		<h2 class="card-title">${card.Name}</h2>
		<div class="types"></div>
		</div>
		</div>`;
	return mainConetent;
}

function statsContent(card) {
	var detailsContent = '';
	statName.forEach((statname) => {
		let value = card[statname];
		detailsContent += `<div class="row justify-content-center">
		<label for="ability" class="col-md-5">${statname}</label>
	
		<div
			class="progress col-md-7"
			style="padding: 0; border: 1px solid #b2b2b2; margin: 0"
		>
			<div
				class="progress-bar bg-success progress-bar-striped"
				role="progressbar"
				aria-valuemin="0"
				aria-valuemax="100"
				style="width: ${value}%; border: 1px solid green"
			>
			${value}
			</div>
		</div>
	</div>`;
	});
	return detailsContent;
}

let appendTypes = (types, a) => {
	var typeData = types.Type;
	var htmlTypeData = document.querySelectorAll('.types');

	for (var i in typeData) {
		try {
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
