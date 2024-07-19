document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    // Simulación de autenticación
    fetch('users.json')
        .then(response => response.json())
        .then(users => {
            let user = users.find(user => user.username === username && user.password === password);
            if (user) {
                // Guardar usuario autenticado en localStorage
                localStorage.setItem('authenticatedUser', JSON.stringify(user));
                // Redirigir a la página de perfil
                window.location.href = 'profile.html';
            } else {
                alert('Usuario o contraseña incorrectos');
            }
        });
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let newUsername = document.getElementById('newUsername').value;
    let newPassword = document.getElementById('newPassword').value;
    let profilePicture = document.getElementById('profilePicture').files[0];

    let reader = new FileReader();
    reader.onloadend = function() {
        let newUser = {
            username: newUsername,
            password: newPassword,
            profilePicture: reader.result
        };

        // Simulación de guardado de usuario en users.json
        fetch('users.json')
            .then(response => response.json())
            .then(users => {
                users.push(newUser);
                // Guardar el nuevo usuario en localStorage (simulación de guardado en servidor)
                localStorage.setItem('users', JSON.stringify(users));
                alert('Registro exitoso. Por favor, inicie sesión.');
                window.location.href = 'index.html';
            });
    };
    reader.readAsDataURL(profilePicture);
});
