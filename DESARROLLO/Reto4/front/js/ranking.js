document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('http://localhost:3030/ppt/obtenerRanking');
      if (response.ok) {
        const rankingData = await response.json();
        await mostrarRanking(rankingData.pptC);
      } else {
        console.error('Error al obtener el ranking');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  });
  
  async function mostrarRanking(rankingData) {
    const rankingContainer = document.getElementById('ranking-container'); // Reemplaza con el ID o selector correcto de tu contenedor de ranking
  
    // Limpia el contenedor existente si es necesario
    rankingContainer.innerHTML = '';
  
    // Crea una tabla HTML para mostrar el ranking
    const table = document.createElement('table');
    table.innerHTML = `
      <tr>
        <th>Posición</th>
        <th>Usuario</th>
        <th>Puntaje</th>
      </tr>
    `;
  
    // Recorre los datos del ranking y agrega filas a la tabla
    for (let i = 0; i < rankingData.length; i++) {
      const item = rankingData[i];
      const fila = document.createElement('tr');
  
      // Obtén el nombre de usuario usando la nueva ruta
      const nombreUsuario = await obtenerNombreUsuario(item.usuarioId);
  
      fila.innerHTML = `
        <td>${i + 1}</td>
        <td>${nombreUsuario || 'Asociar Usuario'}</td>
        <td>${item.puntaje}</td>
      `;
  
      table.appendChild(fila);
    }
  
    rankingContainer.appendChild(table);
  }
  
  async function obtenerNombreUsuario(usuarioId) {
    try {
      const response = await fetch(`http://localhost:3030/ppt/obtenerNombre/${usuarioId}`);
      if (response.ok) {
        const data = await response.json();
        return data.pptC[0].nombre || '';
      } else {
        console.error('Error al obtener el nombre de usuario');
        return '';
      }
    } catch (error) {
      console.error('Error de red:', error);
      return '';
    }
  }