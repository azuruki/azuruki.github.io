import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp, query, orderBy } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const gallery = document.getElementById("imageGallery");
const loginSection = document.getElementById("loginSection");
const loginForm = document.getElementById("loginForm");
const darkModeToggle = document.getElementById('dark-mode-toggle');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const notLoggedInMessage = document.getElementById('notLoggedInMessage');
const loginMessage = document.getElementById('login-message');
const chatSection = document.getElementById('chat-section');
const chatContainer = document.getElementById('chat-container');
const commentInput = document.getElementById('comment-text');
const commentImageInput = document.getElementById('comment-image');
const sendCommentButton = document.getElementById('send-comment-btn');
const commentForm = document.getElementById('commentForm')
const clearCommentsButton = document.getElementById('clear-comments');

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

menuToggle.addEventListener('click', () => {
    mobileMenu.style.display = mobileMenu.style.display === 'none' ? 'flex' : 'none';
});


const firebaseConfig = {
    apiKey: "AIzaSyCCOkfRSHwRQiLWbY5_fDykbpcQdLj4BvY",
    authDomain: "azurukipage.firebaseapp.com",
    projectId: "azurukipage",
    storageBucket: "azurukipage.firebasestorage.app",
    messagingSenderId: "154795115110",
    appId: "1:154795115110:web:588b915040d065ae1223a7",
    measurementId: "G-LK18PYWEYW"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
setLoggedIn(isLoggedIn)

function setLoggedIn(loggedIn) {
    if (loggedIn) {
        loginSection.style.display = "none";
        notLoggedInMessage.style.display = "none";
        commentForm.style.display = 'flex'
    } else {
        loginSection.style.display = "block";
        notLoggedInMessage.style.display = "block";
        commentForm.style.display = 'none'
    }
}

const AUTH_USERNAME = "admin";
const AUTH_PASSWORD = "password";

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const username = formData.get('username');
    const password = formData.get('password');
    if (username === AUTH_USERNAME && password === AUTH_PASSWORD) {
        loginMessage.textContent = "¡Autenticación exitosa!";
        localStorage.setItem('isLoggedIn', 'true');
        setLoggedIn(true)
    } else {
        loginMessage.textContent = "Credenciales incorrectas";
        setLoggedIn(false);
    }
});

sendCommentButton.addEventListener("click", async () => {
  const commentText = commentInput.value.trim();
  const commentImageFile = commentImageInput.files[0];
  let imageUrl = null;

  if (commentText === "" && !commentImageFile) {
        alert("Por favor, escribe un comentario o selecciona una imagen.");
    return;
  }

   if (commentImageFile) {
      const storageRef = ref(storage, `images/${commentImageFile.name}`);
     await uploadBytes(storageRef, commentImageFile);
      imageUrl = await getDownloadURL(storageRef);
   }
     const newComment = {text: commentText, image: imageUrl, timestamp: serverTimestamp()};
     try {
        await addDoc(collection(db, "comments"), newComment);
        addCommentToChat(newComment)
        commentInput.value = '';
        commentImageInput.value = '';
    } catch (e) {
      console.error("Error adding document: ", e);
    }

});

function addCommentToChat(commentData) {
    const newComment = document.createElement('div');
    newComment.classList.add("mb-2", "p-2", "border", "rounded-md");
    let commentHTML = `<p><strong>Admin:</strong> ${commentData.text}</p>`;
    if (commentData.image) {
        commentHTML += `<img src="${commentData.image}" alt="Imagen del comentario" class="mt-2 rounded-md" style="max-width: 200px;">`;
    }
    newComment.innerHTML = commentHTML;
    chatContainer.appendChild(newComment);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function loadCommentsOnStart() {
  const q = query(collection(db, "comments"), orderBy("timestamp", "asc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    addCommentToChat(doc.data())
  });
}
loadCommentsOnStart();


function clearComments(){
    chatContainer.innerHTML = "";
}

clearCommentsButton.addEventListener('click', () => clearComments())