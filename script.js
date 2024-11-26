// PASO 1: Declara tu token de acceso
const accessToken = 'IGQWRNNzcyTnoxS2dMT18yc1hINHNGWFRUNkhDR2NHbHpCelBlNEoya3dFbDRqRmFGR09HaDNLejRhMkwxWndqcUM0ZAEdHaVo1QWRXNFZAZAX2owV3JRS1EyZA29DVG9sOXp3a2ZATUmtVYzZAodzhLcjJRNHE3aTNyNXMZD'; // Reemplaza 'TU_ACCESS_TOKEN' con tu token real

// PASO 2: Construye la URL de la API con el token
const apiUrl = https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,timestamp&access_token=${accessToken};

// PASO 3: Función para cargar las publicaciones de Instagram
async function loadInstagramPosts() {
  try {
    // Solicita los datos desde la API
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error('Error al conectar con la API:', response.status, response.statusText);
      return;
    }

    // Convierte los datos en JSON
    const data = await response.json();

    // Obtiene el contenedor donde mostrarás las publicaciones
    const feedContainer = document.getElementById('instagram-feed');

    // Itera sobre las publicaciones y crea los elementos HTML
    data.data.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');

      // Si es una imagen
      if (post.media_type === 'IMAGE') {
        const img = document.createElement('img');
        img.src = post.media_url;
        img.alt = post.caption || 'Publicación de Instagram';
        postElement.appendChild(img);
      }
      
      // Si es un video
      else if (post.media_type === 'VIDEO') {
        const video = document.createElement('video');
        video.src = post.media_url;
        video.controls = true;
        postElement.appendChild(video);
      }

      // Añade la descripción si existe
      if (post.caption) {
        const caption = document.createElement('p');
        caption.textContent = post.caption;
        postElement.appendChild(caption);
      }

      // Añade la publicación al contenedor
      feedContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error('Error al cargar publicaciones:', error);
  }
}

// Llama a la función al cargar la página
window.onload = loadInstagramPosts;



