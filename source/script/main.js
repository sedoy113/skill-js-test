import "../scss/style.scss"
import "./utils/prism.js";
import "./modules/header/init-page-menu.js";
import { iosVhFix } from "./utils/ios-vh-fix.js";


window.addEventListener('DOMContentLoaded', () => {
	iosVhFix();

	window.addEventListener('load', () => {

	});
});

// карточки
document.addEventListener('DOMContentLoaded', () => {
	const coursesList = document.querySelector('.courses__list[data-project="parent"]');
	const template = document.querySelector('.template-project-card[data-template="project-card"]');
	const filterLinks = document.querySelectorAll('.courses__filter-link[data-filter="link"]');
	let projectsData = [];

	// Загрузка данных из JSON
	fetch('public/projects.json')
		.then(response => response.json())
		.then(data => {
			projectsData = data;
			renderCards(projectsData); // Первоначальная отрисовка всех карточек
		})
		.catch(error => console.error('Ошибка загрузки данных:', error));

	// Функция для отрисовки карточек
	function renderCards(data) {
		coursesList.innerHTML = ''; // Очищаем список перед отрисовкой
		data.forEach(item => {
			const card = template.content.cloneNode(true).querySelector('.courses__item');

			card.querySelector('.product-card__title').textContent = item.title;
			card.querySelector('.product-card__img').src = item.src;
			card.querySelector('.product-card__img').alt = item.alt;
			card.querySelector('.product-card__label').textContent = item.label;
			card.querySelector('.product-card__date').textContent = item.date;
			card.querySelector('.product-card__shadow-link').href = item.href;

			item.classes.forEach(className => {
				card.querySelector('.product-card').classList.add(className);
			});

			if (item.hit) {
				card.querySelector('.product-card__hit').style.display = 'flex';
			} else {
				card.querySelector('.product-card__hit').style.display = 'none';
			}

			coursesList.appendChild(card);
		});
	}

	// Функция для фильтрации карточек
	function filterCards(filter) {
		if (filter === '#all') {
			renderCards(projectsData); // Показать все карточки
		} else {
			const filteredData = projectsData.filter(item => item.tags.includes(filter));
			renderCards(filteredData); // Показать отфильтрованные карточки
		}
	}

	// Добавляем обработчики событий на ссылки фильтрации
	filterLinks.forEach(link => {
		link.addEventListener('click', (event) => {
			event.preventDefault(); // Предотвращаем переход по ссылке

			// Удаляем класс is-active у всех ссылок
			filterLinks.forEach(link => link.classList.remove('is-active'));

			// Добавляем класс is-active к выбранной ссылке
			link.classList.add('is-active');

			// Получаем значение фильтра из атрибута href
			const filter = link.getAttribute('href');
			filterCards(filter); // Фильтруем карточки
		});
	});
});



