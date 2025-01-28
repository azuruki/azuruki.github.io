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

  darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
  });

   menuToggle.addEventListener('click', () => {
      mobileMenu.style.display = mobileMenu.style.display === 'none' ? 'flex' : 'none';
  });


  function setLoggedIn(loggedIn) {
    if (loggedIn) {
        loginSection.style.display = "none";
        notLoggedInMessage.style.display = "none";
        chatSection.style.display = "block"
    } else {
        loginSection.style.display = "block";
         notLoggedInMessage.style.display = "block";
        chatSection.style.display = "none"
    }
}
  loginForm.addEventListener("submit", async (e) => {
     e.preventDefault();
      const formData = new FormData(loginForm);
      const username = formData.get('username')
      const password = formData.get('password')
      const loginData = {
          username,
          password,
      };
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
         headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      if (response.ok) {
          const responseData = await response.json();
          if (responseData.success) {
                loginMessage.textContent = "¡Autenticación exitosa!";
                 setLoggedIn(true)
          } else {
              loginMessage.textContent = "Credenciales incorrectas";
             setLoggedIn(false)
          }
      } else {
          loginMessage.textContent = "Hubo un error al intentar loguearse.";
          setLoggedIn(false)
      }
  });

 function loadGalleryOnStart() {
  fetch('http://localhost:3000/uploads')
    .then(response => {
       if (!response.ok) {
         throw new Error(`Error al obtener la lista de archivos: ${response.statusText}`);
        }
         return response.json();
      })
      .then(images => {
       images.forEach(img => {
          const newImage = document.createElement("div");
         newImage.classList.add("shadow-lg", "rounded-lg", "p-2", "transition-transform", "transform", "hover:scale-105");
         newImage.innerHTML = `
               <img
                   src="/uploads/${img.url}"
                   alt="${img.name}"
                   class="rounded-lg w-full object-cover"
               />
               <p class="text-center text-sm text-gray-600 mt-2">${img.name}</p>
            `;
             gallery.appendChild(newImage);
         });
      })
       .catch(error => {
           console.error('Hubo un error al cargar la galería:', error);
           gallery.innerHTML = '<p>No se pudieron cargar las imágenes.</p>';
        });
   }
   sendCommentButton.addEventListener("click", async () => {
    const commentText = commentInput.value.trim();
   const commentImageFile = commentImageInput.files[0];


    if (commentText === "" && !commentImageFile) {
        alert("Por favor, escribe un comentario o selecciona una imagen.");
        return;
    }

     const formData = new FormData();
        formData.append('text', commentText)
        if (commentImageFile) {
          formData.append('image', commentImageFile);
         }
    const response = await fetch('http://localhost:3000/comment', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
        const responseData = await response.json();
       addCommentToChat(responseData);
        commentInput.value = '';
        commentImageInput.value= '';

    } else {
          alert('Error al enviar el comentario');
    }
});

function addCommentToChat(commentData){
const newComment = document.createElement('div');
newComment.classList.add("mb-2", "p-2","border","rounded-md");
let commentHTML = `<p><strong>Admin:</strong> ${commentData.text}</p>`;
if (commentData.image) {
    commentHTML += `<img src="/uploads/${commentData.image}" alt="Imagen del comentario" class="mt-2 rounded-md" style="max-width: 200px;">`;
}
 newComment.innerHTML = commentHTML;
chatContainer.appendChild(newComment);
chatContainer.scrollTop = chatContainer.scrollHeight;

}
function loadCommentsOnStart(){
fetch('http://localhost:3000/comment')
.then(response => {
   if (!response.ok) {
       throw new Error(`Error al obtener la lista de comentarios: ${response.statusText}`);
     }
      return response.json();
    })
    .then(comments => {
       comments.forEach(comment => addCommentToChat(comment))
    })
      .catch(error => {
         console.error('Hubo un error al cargar los comentarios:', error);
           chatContainer.innerHTML = '<p>No se pudieron cargar los comentarios.</p>';
    });
}
 loadGalleryOnStart();
 setLoggedIn(false)