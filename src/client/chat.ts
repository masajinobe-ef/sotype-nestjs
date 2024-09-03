import io from 'socket.io-client';

const socket = io('http://localhost:40800');
const username = prompt('Введите ваше имя');

if (!username || !username.trim()) {
  alert('Имя не может быть пустым. Страница будет перезагружена.');
  location.reload();
} else {
  document.getElementById('chat-container').style.display = 'block';

  socket.emit('newUser', username);
  socket.on('connect', () => {
    console.log(
      `Подключено к серверу как ${username}. Вы можете начать общение!`,
    );
  });

  socket.on('message', (messageData) => {
    const messagesDiv = document.getElementById('messages');
    const timestamp = new Date().toLocaleTimeString();

    messagesDiv.innerHTML += `<p>[${timestamp}] <strong>${messageData.username}:</strong> ${messageData.text}</p>`;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });

  socket.on('error', (error) => {
    console.error(`Ошибка Socket.IO: ${error}`);
  });

  document.getElementById('send').addEventListener('click', () => {
    const messageInput = document.getElementById('message') as HTMLInputElement;
    const messageText = messageInput.value.trim();

    if (messageText) {
      const messageData = {
        username: username,
        text: messageText,
      };
      socket.emit('message', messageData);
      messageInput.value = '';
    } else {
      alert('Сообщение не может быть пустым.');
    }
  });
}
