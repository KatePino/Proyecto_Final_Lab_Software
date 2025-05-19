import renderScreen1 from './screens/screen1.js';
import renderScreen2 from './screens/screen2.js';
import renderScreen3 from './screens/screen3.js';

const appDiv = document.getElementById('app');

async function showScreen1() {
  appDiv.innerHTML = '';
  const screen = await renderScreen1(async respuestas => {
    showScreen2(respuestas);
  });
  appDiv.appendChild(screen);
}

async function showScreen2(respuestas) {
  appDiv.innerHTML = '';
  const screen = await renderScreen2(respuestas, () => {
    showScreen3();
  });
  appDiv.appendChild(screen);
}

function showScreen3() {
  appDiv.innerHTML = '';
  const screen = renderScreen3(() => {
    appDiv.innerHTML = '<h2>¡Gracias! Tus datos han sido guardados.</h2>';
  });
  appDiv.appendChild(screen);
}

showScreen1();