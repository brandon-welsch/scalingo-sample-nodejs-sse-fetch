import { fetchEventSource } from "https://esm.sh/@microsoft/fetch-event-source";

const messagesDiv = document.getElementById('messages');

const addMessage = (message) => {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);
};

fetchEventSource('/events', {
    onmessage(event) {
        const data = JSON.parse(event.data);
        addMessage(data.message);
    },
    keepalive: true,
    openWhenHidden: true,
});
