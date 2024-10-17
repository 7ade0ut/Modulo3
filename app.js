document.addEventListener("DOMContentLoaded", () => {
  const toggleConversationsBtn = document.getElementById("toggle-conversations-btn");
  const chatSidebar = document.getElementById("chatSidebar");
  const sendBtn = document.getElementById("sendBtn");
  const messageInput = document.getElementById("messageInput");
  const messagesContainer = document.querySelector(".messages");
  const lastMessageTime = document.getElementById("lastMessageTime"); // Elemento para actualizar la hora y fecha de Usuario 1

  // Funcionalidad para colapsar o expandir la lista de conversaciones en móviles
  toggleConversationsBtn.addEventListener("click", () => {
    chatSidebar.classList.toggle("visible");
  });

  // Manejo de eventos para marcar conversaciones como leídas
  const conversations = document.querySelectorAll(".conversation");

  conversations.forEach(conversation => {
    conversation.addEventListener("click", () => {
      conversations.forEach(conv => conv.classList.remove("active"));
      conversation.classList.add("active");
      conversation.querySelector(".name").style.fontWeight = "normal"; // Marca como leída
    });
  });

  // Función para obtener la hora y fecha actual
  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Mes empieza desde 0
    const year = now.getFullYear();
    const time = `${hours}:${minutes}`;
    const date = `${day}/${month}/${year}`;
    return `${time} ${date}`;
  }

  // Función para agregar un mensaje al chat con hora y fecha
  function addMessage(text, type = "sent") {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", type);
    
    const time = getCurrentTime(); // Obtener hora y fecha actual
    messageElement.innerHTML = `
      <p>${text}</p>
      <span class="time">${time}</span>
    `;
    
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Mantener el scroll en el fondo

    // Actualizar la hora y fecha en la lista de conversaciones (Usuario 1)
    lastMessageTime.textContent = time;
  }

  // Evento para enviar el mensaje
  sendBtn.addEventListener("click", () => {
    const messageText = messageInput.value.trim();
    if (messageText !== "") {
      addMessage(messageText); // Añadir el mensaje con la hora actual
      messageInput.value = ""; // Limpiar el campo de entrada
    }
  });
});
