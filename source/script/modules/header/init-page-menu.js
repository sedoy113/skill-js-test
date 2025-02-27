document.addEventListener('DOMContentLoaded', () => {
	const burger = document.querySelector('[data-sandwich]');
	const menu = document.querySelector('[data-main-nav]');
	const logo = document.querySelector('[data-header-logo]'); // Логотип
	const body = document.body;

	// Функция для открытия/закрытия меню
	const toggleMenu = () => {
		burger.classList.toggle('is-active');
		menu.classList.toggle('is-active');
		body.classList.toggle('is-menu-open'); // Блокировка скролла
		logo.classList.toggle('is-menu'); // Добавляем/удаляем класс для логотипа

		// Добавляем задержку для анимации пунктов меню
		if (menu.classList.contains('is-active')) {
			const menuItems = menu.querySelectorAll('[data-nav-item]');
			menuItems.forEach((item, index) => {
				item.style.transitionDelay = `${index * 0.1}s`;
			});
		} else {
			const menuItems = menu.querySelectorAll('[data-nav-item]');
			menuItems.forEach((item) => {
				item.style.transitionDelay = '0s';
			});
		}
	};

	// Обработчик клика на бургер
	burger.addEventListener('click', toggleMenu);

	// Закрытие меню по кнопке Esc
	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && menu.classList.contains('is-active')) {
			toggleMenu();
		}
	});

	// Закрытие меню при изменении размера окна (без использования resize)
	const resizeObserver = new ResizeObserver((entries) => {
		for (const entry of entries) {
			const width = entry.contentRect.width;
			if (width >= 1024 && menu.classList.contains('is-active')) {
				toggleMenu();
			}
		}
	});

	resizeObserver.observe(document.body);
});