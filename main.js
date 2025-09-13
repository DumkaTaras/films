import { main, mainContent } from './menu.js';
import { likedList } from './search.js';
export { mainSection };

function mainSection() {
    main.addEventListener('click', function () {
        mainContent.innerHTML = `
            <div class="mainCash">
                <h1>Ви потрапили на сайт з підбором фільмів</h1>
                <p>Щоб знайти фільм, перейдіть у розділ "Пошук фільму" та введіть назву англійською мовою.</p>
                <p>У розділі "Уподобане" ви зможете переглянути всі фільми, які ви додали до свого списку вподобаних.</p>
                <h3>Ось декілька випадкових фільмів, які можуть вас зацікавити:</h3>
                <ul id="randomFilms"></ul>
                <p>Насолоджуйтесь переглядом та відкривайте для себе нові фільми!</p>
            </div>
        `;
        const randomFilms = document.getElementById('randomFilms');
        randomFilms.innerHTML = '<li>Завантаження...</li>';

        // Отримуємо 4 випадкових фільми
        Promise.all(
            Array.from({ length: 4 }, () => {
                const randomId = Math.floor(Math.random() * 5000) + 1;
                return fetch(`https://api.tvmaze.com/shows/${randomId}`)
                    .then(response => {
                        if (!response.ok) throw new Error();
                        return response.json();
                    })
                    .catch(() => null);
            })
        ).then(films => {
            randomFilms.innerHTML = '';
            films.forEach(film => {
                if (film && film.image && film.name) {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <figure class='likeFilm'>
                            <h3>${film.name}</h3>
                            <img src="${film.image.medium}" alt="${film.name}" width="100px" height="150px">
                            <figcaption>Рейтинг: ${film.rating?.average ?? 'Немає'}</figcaption>
                            <span class="likeBtn" style="cursor:pointer"></span>
                        </figure>
                    `;

                    const likeBtn = li.querySelector('.likeBtn');
                    const likedFilms = JSON.parse(localStorage.getItem('likedFilms')) || [];
                    const isLiked = likedFilms.some(f => f.id === film.id);

                    updateLikeIcon(likeBtn, isLiked);

                    likeBtn.addEventListener('click', () => toggleLike(film, likeBtn));

                    randomFilms.appendChild(li);
                }
            });
            if (!randomFilms.hasChildNodes()) {
                randomFilms.innerHTML = `<li>Не вдалося знайти фільми. Спробуйте ще раз.</li>`;
            }
        });
    });
}

// Перемикаємо лайк
function toggleLike(film, btn) {
    let likedFilms = JSON.parse(localStorage.getItem('likedFilms')) || [];
    const isLiked = likedFilms.some(f => f.id === film.id);

    if (!isLiked) {
        likedFilms.push({
            id: film.id,
            name: film.name,
            image: film.image.medium || film.image,
            rating: film.rating?.average ?? 'Немає'
        });
        localStorage.setItem('likedFilms', JSON.stringify(likedFilms));

        updateLikeIcon(btn, true);
    } else {
        likedFilms = likedFilms.filter(f => f.id !== film.id);
        localStorage.setItem('likedFilms', JSON.stringify(likedFilms));
        updateLikeIcon(btn, false);
    }
}

// Змінюємо іконку лайку
function updateLikeIcon(btn, isLiked) {
    btn.innerHTML = isLiked
        ? `<img src="./images/images.png" alt="like" width="18px" height="18px">`
        : `<img src="./images/images__1_-removebg-preview.png" alt="like" width="16px" height="18px">`;
}

console.log(main, mainContent);

mainSection();
