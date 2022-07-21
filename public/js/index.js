const socket = io();
window.addEventListener('load', function () {
	let chat = document.getElementById('chat');
	let message = document.getElementById('message');
	let user = document.getElementById('user');
	let btn = document.querySelector('.btn-outline-secondary');
	let type = document.getElementById('type');
	let form = document.querySelector('.form');
	let clean = document.querySelector('.borrar');

	const tiempo = new Date();
	let hora = tiempo.getHours();
	let minutos = tiempo.getMinutes();
	let horaActual = hora + ':' + minutos;

	user.focus();
	message.focus();

	form.addEventListener('submit', function (e) {
		e.preventDefault();
	});

	btn.addEventListener('click', function () {
		socket.emit('chat message', {
			message: message.value,
			user: user.value,
		});
		message.value = '';
	});
	clean.addEventListener('click', function () {
		chat.innerHTML = '';
	});

	socket.on('chat message', function (data) {
		message.addEventListener('submit', function (e) {
			if (message.value.length < 0) {
				e.preventDefault();
			}
		});

		(chat.innerHTML += `<h4> <strong> ${data.user}:</strong>${data.message} </i> <b class="tiempo">${horaActual}</b></h4>`),
			chat.scrollTo(0, document.body.scrollHeight);

		type.innerHTML = '';
	});

	message.addEventListener('keydown', function () {
		socket.emit('typing', user.value);
	});

	message.addEventListener('keypress', function (e) {
		if (e.key == 'Enter') {
			btn.click();
		}
	});
	socket.on('typing', function (data) {
		type.innerHTML = `<h5><i>${data} is typing...</i></h5>`;
	});
});
