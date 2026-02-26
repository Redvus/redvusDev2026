// ВАЖНО: Импортируем SCSS правильно
import "../scss/main.scss"; // Относительный путь от js файла
if (import.meta.env.DEV) {
    import("./fonts-loader.js");
}

console.log("Vite main.js loaded!");

// Для проверки создадим элемент
// document.addEventListener("DOMContentLoaded", () => {
//     const div = document.createElement("div");
//     div.style.cssText = `
//         position: fixed;
//         top: 10px;
//         left: 10px;
//         background: green;
//         color: white;
//         padding: 10px;
//         z-index: 9999;
//         border-radius: 5px;
//     `;
//     div.textContent = "Vite JS loaded!";
//     document.body.appendChild(div);
// });

export const version = "1.0.0";
