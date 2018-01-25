var points = 0;
var rounds = 0;
var roundMax = 10;
var gen;
var tabs = document.querySelectorAll(".tabs");
var mTitle = document.querySelector("#menu-title");
var genPick = document.querySelector("#gPick"); 
var sTitle = document.querySelector("#sTitle"); 
var oMenu = document.querySelector("#oMenu"); 
var gDiv = document.querySelector("#game-div"); 
var pDiv = document.querySelector("#pokemon-found") 
var body = document.querySelectorAll("body");
var pokemonFound = [];
var pokemonStorage = [];

function startGame() {
	var startMenu = function() {

		// menü başlığı sakla
		document.querySelector("#menu-title").style.display = "none";

		// start title göster
		document.querySelector("#sTitle").style.display = "flex";

		// event listenersları sil
		document.body.removeEventListener("keypress", startMenu);
		document.body.removeEventListener("click", startMenu);
	}

	var btnFunc = function() {
		document.querySelectorAll("html")[0].style.overflow = "hidden";
		document.querySelectorAll('body')[0].style.overflow = "hidden";
		document.querySelectorAll("html")[0].style.height = "100%";
		var parent = this.parentElement.getAttribute("id");
		document.querySelector('#' + parent).style.display = "none";
		sTitle.style.display = "flex";
	};

	var tabFunc = function() {
		var id = this.getAttribute("id").match(/\d+/)[0];

		if (id === '1') {
			sTitle.style.display = "none";
			genPick.style.display = "flex";

			var gBox = document.querySelectorAll(".gen-box");
			var test;

			var gameMode = function() {

				// kullandıktan sonra event listenersları sil
				for (var i = 0; i < tabs.length; i++) {
					tabs[i].removeEventListener("click", tabFunc);
				}

				for (var gb = 0; gb < gBox.length; gb++) {
					gBox[gb].removeEventListener("click", gameMode);
				}
				test = true;
				var gMode = this.getAttribute("id");
				genPick.style.display = "none";
				gDiv.style.display = "unset";
				switch(gMode) {
					case "gen-1":
						gen = [0, 151]; 
						whomstThatPokemon();
						break
					case "gen-2":
						gen = [151, 251];
						whomstThatPokemon();
						break
					case "gen-3":
						gen = [251, 386];
						whomstThatPokemon();
						break
					case "gen-4":
						gen = [386, 493];
						whomstThatPokemon();
						break
					case "gen-5":
						gen = [493, 649];
						whomstThatPokemon();
						break
					case "gen-6":
						gen = [649, 721];
						whomstThatPokemon();
						break
					case "all":
						gen = [802];
						whomstThatPokemon();
						break;
					default:
						alert("Error");
				}
			}


			// gen-boxlara click events ekle
			for (var gb = 0; gb < gBox.length; gb++) {
				gBox[gb].addEventListener("click", gameMode);
			}

		} else if (id === '2') {
		
		    //boş div
			pDiv.innerHTML = '';
			pDiv.insertAdjacentHTML('beforeend', '<button class="back-btn" id="back-btn-1">Back to menu</button>');
			oMenu.style.display = "none";
			sTitle.style.display = "none";
			pDiv.style.display = "flex";
			document.querySelectorAll("html")[0].style.overflow = "unset";
			document.querySelectorAll("body")[0].style.overflow = "unset";
			

			// grid oluştur
			// bulunan pokemon sayısını öğren
			var pFound = pokemonStorage.length;

			// kaç satır oluşturulur
			var rCount = Math.round(pFound / 2);
			var count = 0;
			for (var cGrid = 0; cGrid < rCount; cGrid++) {
					pDiv.insertAdjacentHTML('beforeend', `<div id=${"fRow_" + cGrid} class="row"></div>`);

					// grid içerisine boxları koy
					for (var cBox = 0; cBox < 2; cBox++) {
						pDiv.querySelector("#fRow_" + cGrid).insertAdjacentHTML('beforeend', `<div class="pok-box" id=${'gBox-' + count}></div>`);
						count++;
					}
			}

			for (var genPoke = 0; genPoke < pFound; genPoke++) {
				pDiv.querySelector('#gBox-' + genPoke).insertAdjacentHTML('beforeend', `<img class="pokeImage" src=${"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemonStorage[genPoke] + ".png"}>`);
			}

			var btns = document.querySelectorAll(".back-btn");
			for (var x = 0; x < btns.length; x++) {
				btns[x].addEventListener("click", btnFunc);
			}

		} else if (id === '3') {
			sTitle.style.display = "none";
			oMenu.style.display = "flex";
			
			// boş div
			oMenu.innerHTML = '';

			//oMenu dive element ekle
			oMenu.insertAdjacentHTML('beforeend', '<button class="back-btn">Menüye dön</button>');
			oMenu.insertAdjacentHTML('beforeend', '<h3 class="menuHeaders">Pokemon numarası ara (örnek 25)</h3>');
			oMenu.insertAdjacentHTML('beforeend', `<input type="text" id=${'sInput'}>`);
			oMenu.insertAdjacentHTML('beforeend', `<button id=${'sButton'}>OK</button>`);

			function getPokemon() {
				var pInput = document.querySelector("#sInput").value;
				if (pInput === '') {
					alert("lütfen id veya isim yazın"); 
				} else {
					//api
					fetch('https://pokeapi.co/api/v2/pokemon/' + pInput + '/')
					  .then(
						function(response) {
						  if (response.status !== 200) {
							console.log('Bir problem var. Status Code: ' +
							  response.status);
							return;
						  }

						  // response incele
						  response.json().then(function(data) {
							oMenu.style.display = "none";
							var pokeDetails = document.querySelector('#pokemon-details').style.display = "flex";

							// elementlerin içine data koy
							document.querySelector("#pokemon-name").innerHTML = data.name;
							document.querySelector("#pokedex_image").setAttribute('src', data.sprites.front_default);
							document.querySelector("#pokemon-num").innerHTML = data.id;

						  });
						}
					  )
					  .catch(function(err) {
						console.log('Fetch Error ', err);
					  });

				}
			};



			sButton.addEventListener("click", getPokemon);



			var btns = document.querySelectorAll(".back-btn");
			for (var x = 0; x < btns.length; x++) {
				btns[x].addEventListener("click", btnFunc);
			}

		} else {
			alert("Error!");
		}

	}


	for (var i = 0; i < tabs.length; i++) {
		tabs[i].addEventListener("click", tabFunc);
	}

	document.body.addEventListener("keypress", startMenu);
	document.body.addEventListener("click", startMenu);
}

function whomstThatPokemon() {
	document.querySelector("#points").innerHTML = points;
	document.querySelector("#rounds").innerHTML = rounds;
	if (rounds === roundMax) { // kazandın, menüye dön
		

		//mTitle.style.display = 'flex'
		//gDiv.style.display = 'none'

		mDiv.innerHTML = '';
		mDiv.insertAdjacentHTML('beforeend', `<h2 id=${'endTitle'}>${'You got ' + points + ' out of ' + roundMax + '!'}</h2>`);
		mDiv.insertAdjacentHTML('beforeend', '<button id="mEnd" class="back-btn">Menüye dön</button>');
		rounds = 0;
		points = 0;

		
		var endGame = function() {
			gDiv.style.display = "none";
			startGame();
		}

		var endBtn = document.querySelector("#mEnd");
		endBtn.addEventListener("click", endGame);

		
	} else {
		// Math.floor(Math.random() * (max - min)) + (min + 1); (max = gen)
		// random sayı al
		var randomNum = function() {
			if (gen.length > 1) {
				randomNumber = Math.floor(Math.random() * (gen[1] - gen[0])) + (gen[0] + 1);
			} else {
				randomNumber = Math.floor(Math.random() * gen) + 1; 
			}
			// sayı seçilmişse fonksiyonu  this === false olana kadar çalıştır
			if (pokemonFound.includes(randomNumber) === true) {

				//console.log(`numara seçildi ${randomNumber} yeni numara al`);
				randomNum();
			}

			return randomNumber;
		}

		var rNum = randomNum();
		pokemonFound.push(rNum);

		//pokemonu al. random değer ver
		getThatPokemon(rNum);
	}
}

function getThatPokemon(pokemonCount) {
	fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonCount + '/')
	  .then(
		function(response) {
		  if (response.status !== 200) {
			console.log('Bir problem var.. Status Code: ' +
			  response.status);
			return;
		  }

		  // response text al
		  response.json().then(function(data) {
		

			var pokemon = {
				"name": data.name.toLowerCase(),
				"image": data.sprites.front_default,
				"id": data.id
			}


			// Main div
			const mDiv = document.querySelector("#mDiv");

			// boş div
			mDiv.innerHTML = '';

			// image tag oluştur
			mDiv.insertAdjacentHTML('afterbegin', `<img id=${'pokemon-image'} src=${pokemon.image} height=${300} width=${300}>`);

			// Hangi Pokemon ekle
			mDiv.insertAdjacentHTML('beforeend', `<h3 id=${'mHeader'}>${'Hangi Pokemon?'}</h3>`);

			// cevap almak için input ekle
			mDiv.insertAdjacentHTML('beforeend', `<div id=${'iDiv'}></div>`);
			const iDiv = document.querySelector("#iDiv");

			iDiv.insertAdjacentHTML('beforeend', `<input type="text" id=${'mInput'}>`);
			iDiv.insertAdjacentHTML('beforeend', `<button id=${'mButton'}>OK</button>`);

			// buttona click listener ekle
			const mButton = document.querySelector("#mButton");
			var input = ''

			

			// input değerini al
			var getInput = function() {
				mButton.removeEventListener("click", getInput);

				// tutulan arraye pokemon koy
				pokemonFound.push(pokemon);

				input = document.querySelector("#mInput").value;

				if (input.toLowerCase() === pokemon["name"]) { 
					points++;
					if (pokemonStorage.includes(pokemonCount) !== true) {
						pokemonStorage.push(pokemonCount); //doğru pokemonu göster
					}
				}

				rounds++;

				// puan ve roud güncelle
				document.querySelector("#points").innerHTML = points;
				document.querySelector("#rounds").innerHTML = rounds;



				// pokemonu göster
				const pImage = document.querySelector("#pokemon-image");


				var imageA = pImage.animate(
				[
				  {
					filter: 'brightness(1)',
				  },
				  {
					filter: 'brightness(1)',
				  }
				],
				{
					duration: 3000,
					iterations: 1
				}
				);

				var aAnim = function() {
					imageA.pause();
					pImage.style.filter = 'brightness(1)';

					var imageA_2 = pImage.animate(
						[	{ transform: 'rotate(0)'},
							{ transform: 'rotate(-30deg)'},
							{ transform: 'rotate(20deg)'},
							{ transform: 'rotate(-30deg)'},
							{ transform: 'rotate(0)'}
						], {
							duration: 3000,
						}
					);

					mDiv.insertAdjacentHTML('beforeend', `<h3 id=${'sHeader'}>${'Bu pokemon ' + pokemon.name + '!'}</h3>`);
					var header2 = document.querySelector("#sHeader");
					var header_2 = header2.animate(
						[
							{ fontSize: "0px"},
							{ fontSize: "28px"},

						], {
							duration: 500,
						}
					);

				}

				setTimeout(aAnim, 3000);
				setTimeout(whomstThatPokemon, 8000); // rounds=roundMax olana kadar
			}

			// tıklandığında  'getInput'  çalıştır
			mButton.addEventListener("click", getInput);

		  });
		}
	  )
	  .catch(function(err) {
		console.log('Fetch Error', err);
	  });
}

startGame();