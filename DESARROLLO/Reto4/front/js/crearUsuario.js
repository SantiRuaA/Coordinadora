document.addEventListener('DOMContentLoaded', () => {
    const registroForm = document.getElementById('registroForm');
    const mensajeDiv = document.getElementById('mensaje');

    registroForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = document.getElementById('id').value;
        const nombre = document.getElementById('nombre').value;
        const contrasena = document.getElementById('contrasena').value;
        
        try {
            const response = await fetch('http://localhost:3030/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, nombre, contrasena })
            });

            if (response.ok) {
                const data = await response.json();
                mensajeDiv.innerHTML = `<p>${data.msj}</p>`;
            } else {
                mensajeDiv.innerHTML = '<p>Error al registrar el usuario.</p>';
            }
        } catch (error) {
            console.error('Error de red:', error);
            mensajeDiv.innerHTML = '<p>Error de red. Inténtalo de nuevo más tarde.</p>';
        }
    });
});