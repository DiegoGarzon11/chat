const socket = io();
window.addEventListener('load', function () {
	let chat = document.getElementById('chat');
	let message = document.getElementById('message');
	let user = document.getElementById('user');
	let btn = document.getElementById('btn');
	let type = document.getElementById('type');
	let clean = document.querySelector('.borrar');

	user.focus();

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
		chat.innerHTML += `<p><strong>${data.user}:</strong> <i>${data.message}</i></p>`;
		type.innerHTML = '';
	});

	message.addEventListener('keypress', function () {
		socket.emit('typing', user.value);
	});

	message.addEventListener('keypress', function (e) {
		if (e.key == 'Enter') {
			btn.click();
		}
	});
	socket.on('typing', function (data) {
		type.innerHTML = `<p><i>${data} is typing...</i></p>`;
	});
});
