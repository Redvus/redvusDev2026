// Определяем путь к шрифтам в зависимости от режима
const isDev = import.meta.env.DEV; // Vite автоматически заменяет эту переменную
const fontPath = isDev ? "http://localhost:5173/fonts" : "/assets/fonts";

// Создаем стили с правильным путем
const style = document.createElement("style");
style.textContent = `
    @font-face {
        font-family: 'Roboto Flex';
        src: url('${fontPath}/RobotoFlexVar/RobotoFlexVar.woff2') format('woff2-variations');
        src: url('${fontPath}/RobotoFlexVar/RobotoFlexVar.woff2') format('woff2') tech('variations');
        font-weight: 100 900;
        font-stretch: 75% 125%;
        font-style: oblique 0deg 10deg;
        font-display: block;
    }
`;
document.head.appendChild(style);

// Для отладки (можно удалить в продакшене)
console.log(
    `Шрифты загружаются из: ${fontPath} (${isDev ? "разработка" : "продакшен"})`,
);
