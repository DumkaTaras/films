// fetch('https://jsonplaceholder.typicode.com/posts/1')
// .then(response=>{
//     if (!response.ok) {
//         throw new Error(`HTTP помилка! статус: ${response.status}`);
//     }
//     return response.json();
// })
// .then(data=>{
//     console.log(`Дані поста: ${data.title}`);
// })
// .catch(error=>{
//     console.error(`Помилка: ${error}`);
// });

// const form = document.getElementById('searchForm');
// const pokemonIdInput = document.getElementById('pokemonId');
// const pokemonCard = document.getElementById('pokemonCard');

// form.addEventListener('submit', function (event) {
//     event.preventDefault();
//     const Id = pokemonIdInput.value.trim();
//     if (!Id) {
//         return
//     }
//     fetch(`https://pokeapi.co/api/v2/pokemon/${Id}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP помилка! статус: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(data => {
//             pokemonCard.innerHTML = `
//             <h2>${data.name} (ID: ${data.id})</h2>
//             <img src="${data.sprites.front_default}" alt="${data.name}">
//             <p>Типи: ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
//             <p>Вага: ${data.weight}</p>
//             <p>Зріст: ${data.height}</p>
//         `;
//         })
//         .catch(error => {
//             pokemonCard.innerHTML = `<p>Помилка: ${error.message}</p>`;
//         });
// });

import {toggleMenu} from './menu.js';
import {filmContent,} from './search.js';
import {likeFilm} from './likesFilm.js';
import { mainSection } from './main.js';
likeFilm();
mainSection()
toggleMenu();
filmContent();
