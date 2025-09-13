import {likesFilm,mainContent, main} from './menu.js';
import {likedList} from './search.js';
export { likeFilm};
    window.addEventListener("DOMContentLoaded", function() {
          mainContent.innerHTML = `
        <h1>Фільми що сподобалися</h1>
        <div class="likeContent">

        </div>
        `;
        const likeContent = document.querySelector('.likeContent'); 
        if(likedList){
            likeContent.appendChild(likedList);
        } else{
            likeContent.innerHTML = `<p>Поки що немає вподобаних фільмів. Пошукайте щось цікаве у розділі "Пошук фільму"!</p>`;
        }
    })
function likeFilm() {
    likesFilm.addEventListener('click', function () {
       mainContent.innerHTML = '';
        mainContent.innerHTML = `
        <h1>Фільми що сподобалися</h1>
        <div class="likeContent">

        </div>
        `;
        const likeContent = document.querySelector('.likeContent');
        if(likedList){
            likeContent.appendChild(likedList);
        } else{
            likeContent.innerHTML = `<p>Поки що немає вподобаних фільмів. Пошукайте щось цікаве у розділі "Пошук фільму"!</p>`;
        }
    }  
    )}
