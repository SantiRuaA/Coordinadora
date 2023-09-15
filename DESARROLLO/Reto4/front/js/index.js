document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const mensajeDiv = document.getElementById('mensaje');


  loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const contrasena = document.getElementById('contrasena').value;
    const id = document.getElementById('id').value;

    localStorage.setItem('nombre', nombre);
    localStorage.setItem('idUsuario', id)

    try {
      const response = await fetch('http://localhost:3030/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre,
          contrasena,
          id
        })
      });

      if (response.ok) {
        // Si todo está bien, redireccionamos a la página principal
        window.location.href = 'paginaPrincipal.html'; // Cambia 'paginaPrincipal.html' por la ruta correcta
      } else {
        mensajeDiv.innerHTML = '<p>Error al iniciar sesión. Usuario o contraseña incorrectos.</p>';
      }
    } catch (error) {
      console.error('Error de red:', error);
      mensajeDiv.innerHTML = '<p>Error de red. Inténtalo de nuevo más tarde.</p>';
    }
  });
});

//obtener id del usuario



