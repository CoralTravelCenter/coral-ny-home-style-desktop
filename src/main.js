import paravoz from './paravoz.html?raw'
import './main.css'
import './paravoz.scss'
import {gsap} from 'gsap'
import {CustomEase} from 'gsap/CustomEase'
import {TweenLite} from "gsap/gsap-core";
import {getRandomPrediction} from "./predictions.js";

gsap.registerPlugin(CustomEase)
if (location.origin.includes('backoffice')) return;

// Создание элемента для paravoz и добавление его в родительский элемент .menu
const menuParent = document.querySelector(".menu").parentElement;
const paravozElement = document.createElement("div");
paravozElement.innerHTML = paravoz; // Предполагаем, что paravoz — это HTML строка
menuParent.appendChild(paravozElement);

// Установка стиля для родительского элемента
menuParent.style.position = "relative";

const randomPrediction = getRandomPrediction();
const predzkazaniye = document.querySelector("#predzkazaniye");
const question = predzkazaniye.querySelector(".text .question");
const answer = predzkazaniye.querySelector(".text .answer");
answer.innerHTML = randomPrediction;

predzkazaniye.querySelector(".text [data-close]").addEventListener("click", () => {
	predzkazaniye.classList.add("js-hidden");
});
predzkazaniye.querySelector(".text [data-action]").addEventListener("click", () => {
	predzkazaniye.querySelector(".text").classList.add("toggled");
	predzkazaniye.querySelector(".text [data-close]").classList.remove("js-hidden");
	question.classList.add("js-hidden");
	answer.classList.remove("js-hidden");
	ym(96674199, "reachGoal", "prediction");
});


// Создание элемента <canvas> и добавление его в .carouselContainer
const placeToInsert = document.querySelector('#quick-search-tab-area + div');
const canvasElement = document.createElement("canvas");
canvasElement.id = "particle_canvas";
placeToInsert.style.position = "relative";
placeToInsert.append(canvasElement);
const canvas = document.getElementById("particle_canvas");
const ctx = canvas.getContext("2d");


const snowFlakes = [];
const snowflakeSettings = {
	count: 500,
	size: 3,
	speed: 0.6, // Единая настройка скорости
	windStrength: 0.05,
}

class Snowflake {
	constructor() {
		this.reset()
	}

	reset() {
		this.x = Math.random() * canvas.width
		this.y = -Math.random() * canvas.height; // Начинаем сверху
		this.size = snowflakeSettings.size
		this.speed = snowflakeSettings.speed + Math.random() * 0.1 - 0.05; // Добавляем случайное отклонение
		this.opacity = Math.random() * 0.5 + 0.5
		this.windX = Math.random() * snowflakeSettings.windStrength * 2 - snowflakeSettings.windStrength; // Случайный "ветер"
	}

	update() {
		this.y += this.speed
		this.x += this.windX; // Добавляем "ветер" к движению по горизонтали
		if (this.y > canvas.height) {
			this.reset() // Сбрасываем снежинку, когда она достигает нижней части
		}
	}

	draw() {
		ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
		ctx.fill();
	}
}

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	createSnowflakes(); // Пересоздаем снежинки при изменении размера окна
}

window.addEventListener("resize", resizeCanvas);

function createSnowflakes() {
	snowFlakes.length = 0; // Очищаем массив
	for (let i = 0; i < snowflakeSettings.count; i++) {
		snowFlakes.push(new Snowflake());
	}
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	snowFlakes.forEach((snowflake) => {
		snowflake.update();
		snowflake.draw();
	});

	requestAnimationFrame(animate);
}

// Инициализация
resizeCanvas();
animate();

CustomEase.create(
	"chugga",
	"M0,0 C0.3,0.396 0.4,-0.004 0.476,-0.004 0.568,-0.004 0.642,0.37 1,0 "
);
CustomEase.create(
	"chugging",
	"M0,0 C0.288,0.1 0.418,0 0.494,0 0.588,0 0.696,0.106 1,0 "
);

TweenLite.to(".smoke", 1.5, {
	ease: "chugga",
	scale: 1.5,
	repeat: -1
});

TweenLite.to(".trainbody", 1.5, {
	ease: "chugging",
	scale: 1.5,
	repeat: -1
});




