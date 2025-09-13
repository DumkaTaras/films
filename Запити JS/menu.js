export { toggleMenu, main, search, likesFilm, mainContent };
const main = document.getElementById('main');
const search = document.getElementById('search');
const likesFilm = document.getElementById('likesFilms');

const mainContent = document.getElementById('mainContent');
let menuVisible = true;
function toggleMenu() {
    document.querySelector('.burger-container').addEventListener('click', function () {
        let list = document.getElementById('list')
        if (menuVisible) {
            list.classList.remove('close');
            list.classList.toggle('show');
            setTimeout(() => {
                main.append('Головна')
                search.append('Пошук фільму')
                likesFilm.append('Уподобане')
                menuVisible = false;
            }, 250);
        } else {
            list.classList.toggle('close');
            list.classList.remove('show');
            main.innerHTML = '<img src="./images/завантаження-removebg-preview.png" alt="logo" width="30px" height="30px">';
            search.innerHTML = '<img src="./images/lupa.png" alt="logo width="30px" height="30px"">';
            likesFilm.innerHTML = '<img src="./images/like.png" alt="like width="30px" height="30px"">';
            menuVisible = true;
        }
    });
}