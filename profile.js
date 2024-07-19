window.addEventListener('load', function() {
    let user = JSON.parse(localStorage.getItem('authenticatedUser'));
    if (!user) {
        // Redirigir al inicio de sesión si no hay un usuario autenticado
        window.location.href = 'index.html';
    } else {
        // Mostrar el nombre de usuario en el perfil
        document.getElementById('welcomeMessage').innerText = `Bienvenido, ${user.username}`;
    }

    document.getElementById('logoutButton').addEventListener('click', function() {
        // Eliminar el usuario autenticado de localStorage y redirigir al inicio de sesión
        localStorage.removeItem('authenticatedUser');
        window.location.href = 'index.html';
    });

    // Manejar la publicación de comentarios
    document.getElementById('commentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        let commentText = document.getElementById('commentText').value;
        let comments = JSON.parse(localStorage.getItem('comments')) || [];
        let comment = {
            username: user.username,
            text: commentText,
            timestamp: new Date().toLocaleString()
        };
        comments.push(comment);
        localStorage.setItem('comments', JSON.stringify(comments));
        document.getElementById('commentText').value = '';
        displayComments();
    });

    // Función para mostrar los comentarios en el muro
    function displayComments() {
        let comments = JSON.parse(localStorage.getItem('comments')) || [];
        let commentWall = document.getElementById('commentWall');
        commentWall.innerHTML = '';
        comments.forEach(comment => {
            let commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `<h4>${comment.username}</h4><p>${comment.text}</p><small>${comment.timestamp}</small>`;
            commentWall.appendChild(commentElement);
        });
    }

    // Mostrar comentarios al cargar la página
    displayComments();
});
