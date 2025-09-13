import { mainContent, search } from './menu.js';

export { filmContent, form, likedList };

const searchContent = document.querySelector('.searchContent');

search.addEventListener('click', function () {
    mainContent.innerHTML = '';
    mainContent.append(searchContent);
});

let form = document.querySelector('.form');
const filmName = document.getElementById('searchFilm');
const findBtn = document.getElementById('btn');

let likedList = document.getElementById('likedFilmsList');
if (!likedList) {
    likedList = document.createElement('ul');
    likedList.id = 'likedFilmsList';
    likedList.style.marginTop = '20px';
    likedList.style.listStyle = 'none';
    document.body.appendChild(likedList);
}

// --- Відновлення лайків при завантаженні ---
window.addEventListener("DOMContentLoaded", function () {
    likedList.innerHTML = '';
    const likedFilms = JSON.parse(localStorage.getItem('likedFilms')) || [];
    likedFilms.forEach(data => {
        renderLikedFilm(data);
    });
});

findBtn.addEventListener('click', filmContent);
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        filmContent();
    }
});

// --- Основна функція ---
function filmContent() {
    const film = filmName.value.trim();
    if (!film) return;

    fetch(`https://api.tvmaze.com/singlesearch/shows?q=${film}`)
        .then(response => {
            if (!response.ok) {
                setTimeout(() => {
                    form.innerHTML = `<p>Фільм не знайдено, введіть назву англійською</p>`;
                }, 2000);
                throw new Error(`HTTP помилка! статус: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            form.innerHTML = `Ваш фільм завантажується...⏳`;

            setTimeout(() => {
                form.innerHTML = `
                    <h2>${data.name} (ID: ${data.id})</h2>
                    <img src="${data.image.medium}" alt="${data.name}">
                    <p>Типи: ${data.type}</p>
                    <p>Мова: ${data.language}</p>
                    <p>Прем'єра: ${data.premiered}</p>
                    <p>Рейтинг: ${data.rating.average}</p>
                `;

                // кнопка лайку
                const likeBtn = document.createElement('span');
                likeBtn.id = 'likeBtn';
                likeBtn.style.cursor = 'pointer';

                const likedFilms = JSON.parse(localStorage.getItem('likedFilms')) || [];
                const isLiked = likedFilms.some(film => film.id === data.id);
                updateLikeIcon(likeBtn, isLiked);

                likeBtn.addEventListener('click', () => toggleLike(data, likeBtn));

                form.appendChild(likeBtn);
                filmName.value = '';
            }, 2000);
        })
        .catch(error => {
            console.error(`Помилка: ${error.message}`);
        });
}

// --- Перемикання лайку ---
function toggleLike(data, btn) {
    let likedFilms = JSON.parse(localStorage.getItem('likedFilms')) || [];
    const isLiked = likedFilms.some(film => film.id === data.id);

    if (!isLiked) {
        likedFilms.push({
            id: data.id,
            name: data.name,
            image: data.image.medium || data.image,
            rating: data.rating.average || data.rating
        });
        localStorage.setItem('likedFilms', JSON.stringify(likedFilms));
        renderLikedFilm(data);
        updateLikeIcon(btn, true);
    } else {
        likedFilms = likedFilms.filter(film => film.id !== data.id);
        localStorage.setItem('likedFilms', JSON.stringify(likedFilms));
        removeFilmFromLikedList(data.id);
        updateLikeIcon(btn, false);
    }
}

// --- Додає фільм у список ---
function renderLikedFilm(data) {
    if (document.getElementById('liked-' + data.id)) return; // захист від дублювання

    const li = document.createElement('li');
    li.id = 'liked-' + data.id;
    li.innerHTML = `
        <figure class='likeFilm'>
        <a href="${data.url}" target="blank"></a>
            <h3>${data.name}</h3>
            <img src="${data.image.medium || data.image}" alt="${data.name}" width="100px" height="150px">
            <figcaption>Рейтинг: ${data.rating?.average ?? 'Немає'}</figcaption>
            <img src="./images/images.png" alt="like" width="18px" height="18px" class="likedIcon" style="cursor:pointer">
        </figure>`;

    const likedIcon = li.querySelector('.likedIcon');
    likedIcon.addEventListener('click', () => toggleLike(data, likedIcon));

    likedList.appendChild(li);
}

// --- Видалення зі списку ---
function removeFilmFromLikedList(id) {
    const li = document.getElementById('liked-' + id);
    if (li) likedList.removeChild(li);
}

// --- Оновлює іконку ---
function updateLikeIcon(btn, isLiked) {
    if (!btn) return;
    btn.innerHTML = isLiked
        ? `<img src="./images/images.png" alt="like" width="18px" height="18px">`
        : `<img src="./images/images__1_-removebg-preview.png" alt="like" width="16px" height="20px">`;

}

