export const snowflakeSettings = {
	count: 500,
	size: 3,
	speed: 0.6, // Единая настройка скорости
	windStrength: 0.05,
}

export class Snowflake {
	constructor(canvas, ctx) {
		this.reset()
		this.canvas = canvas
		this.ctx = ctx
	}

	reset() {
		this.x = Math.random() * this.canvas.width
		this.y = -Math.random() * this.canvas.height; // Начинаем сверху
		this.size = snowflakeSettings.size
		this.speed = snowflakeSettings.speed + Math.random() * 0.1 - 0.05; // Добавляем случайное отклонение
		this.opacity = Math.random() * 0.5 + 0.5
		this.windX = Math.random() * snowflakeSettings.windStrength * 2 - snowflakeSettings.windStrength; // Случайный "ветер"
	}

	update() {
		this.y += this.speed
		this.x += this.windX; // Добавляем "ветер" к движению по горизонтали
		if (this.y > this.canvas.height) {
			this.reset() // Сбрасываем снежинку, когда она достигает нижней части
		}
	}

	draw() {
		this.ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
		this.ctx.fill();
	}
}

