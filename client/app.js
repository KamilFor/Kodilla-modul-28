// Constant downloaded from index.html
const loginForm = document.getElementById('welcome-form'); // Welcome form
const messageSection = document.getElementById('messages-section'); // Section Message
const messagesList = document.getElementById('messages-list'); // UL list with messages
const addMessageForms = document.getElementById('add-messages-form'); // Form to add messages
const userNameInput = document.getElementById('username'); // Input with username
const messageContentInput = document.getElementById('message-content'); // Input with content of messages

const userName = [];

// Function Login (work with LoginForm)
const login = (e) => {
  e.preventDefault();
  if (userNameInput.value.length == 0) alert("Put your name and don't leave empty spaces");
  else {
    userName.push(userNameInput.value);
    loginForm.classList.remove('show');
    messageSection.classList.add('show');
  }
};

//Function SendMessage (work with Message Form)
const sendMessage = (e) => {
  e.preventDefault();
  // Validation
  if (messageContentInput.value.length == 0) alert("Put your name and don't leave empty spaces");
  else {
    addMessage(userName, messageContentInput.value);
    messageContentInput.value = '';
  }
};

// Function Add Message (Init in sendMessage)
function addMessage(author, content) {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if (author === userName) message.classList.add('message--self');
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author}</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
}

// Event Listener to Login form (work with: Login)
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Function login
  login(e);
});

// Event Listener to Message Form
addMessageForms.addEventListener('submit', (e) => {
  e.preventDefault();
  // Initiation Sending Messages
  sendMessage(e);
});

// Function addMessage
