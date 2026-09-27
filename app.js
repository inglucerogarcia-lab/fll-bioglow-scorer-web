const missions = [
  {
    title: 'Encuesta del dron',
    english: 'Drone Survey',
    variations: [
      { label: 'El dron queda completamente fuera del tapete', points: 20 },
      { label: 'Se gira o se voltea el mapa LiDAR para bonus', points: 10 },
    ],
  },
  {
    title: 'Semillas explosivas',
    english: 'Exploding Seeds',
    variations: [
      { label: 'Se retira la primera semilla del casco', points: 10 },
      { label: 'Se retira la segunda semilla del casco', points: 10 },
      { label: 'Se retira la tercera semilla del casco', points: 10 },
    ],
  },
  {
    title: 'Gira la roca',
    english: 'Flip the Rock',
    variations: [
      { label: 'Se derriba la bandera de investigación', points: 20 },
      { label: 'La roca vuelve a la zona de inicio o posición válida', points: 10 },
    ],
  },
  {
    title: 'Hojas afortunadas',
    english: 'Lucky Leaves',
    variations: [
      { label: 'Se retira la primera hoja y el saltamontes sigue en su sitio', points: 10 },
      { label: 'Se retira la segunda hoja y el saltamontes sigue en su sitio', points: 20 },
    ],
  },
  {
    title: 'Raíces que alcanzan',
    english: 'Reaching Roots',
    variations: [
      { label: 'La raíz cruza parcialmente el límite', points: 10 },
      { label: 'La raíz queda completamente extendida', points: 20 },
    ],
  },
  {
    title: 'Frenesí de cortadores de hojas',
    english: 'Leafcutter Frenzy',
    variations: [
      { label: 'La hormiga vuelve al nido con un fragmento dentro', points: 10 },
      { label: 'La hormiga vuelve al nido con otro fragmento dentro', points: 10 },
    ],
  },
  {
    title: 'Hongo enorme',
    english: 'Humongous Fungus',
    variations: [
      { label: 'Se extiende el micelio', points: 20 },
      { label: 'Conexión con otro equipo', points: 10 },
    ],
  },
  {
    title: 'Enredado',
    english: 'Tangled',
    variations: [
      { label: 'Se retira la enredadera y queda sobre el tapete', points: 30 },
    ],
  },
  {
    title: 'Plataforma de investigación',
    english: 'Research Platform',
    variations: [
      { label: 'Se eleva la plataforma', points: 10 },
      { label: 'Se despliega la cámara trampa', points: 10 },
      { label: 'Se retira la semilla', points: 10 },
    ],
  },
  {
    title: 'Microhábitats frágiles',
    english: 'Fragile Microhabitats',
    variations: [
      { label: 'La araña permanece en su sitio', points: 10 },
      { label: 'El caracol permanece en su sitio', points: 10 },
    ],
  },
  {
    title: 'Ventana al pasado',
    english: 'Window to the Past',
    variations: [
      { label: 'Se abre la cubierta de raíces y queda plana sobre el tapete', points: 20 },
    ],
  },
  {
    title: 'Anciano del bosque',
    english: 'Forest Elder',
    variations: [
      { label: 'Se eleva el palo o soporte del árbol viejo', points: 20 },
      { label: 'Se añade el lazo de soporte', points: 10 },
    ],
  },
  {
    title: 'Especie clave',
    english: 'Keystone Species',
    variations: [
      { label: 'Verifica la misión en el reglamento oficial de FIRST', points: 0 },
    ],
    note: 'La misión 13 requiere confirmar la condición exacta y el valor de puntos según la versión oficial del reglamento.',
  },
  {
    title: 'Semillas de renovación',
    english: 'Seeds of Renewal',
    variations: [
      { label: 'Verifica la combinación exacta y la puntuación oficial', points: 0 },
    ],
    note: 'La misión 14 depende de las semillas y combinaciones obtenidas en misiones previas.',
  },
  {
    title: 'Arquitectura biocéntrica',
    english: 'Biocentric Architecture',
    variations: [
      { label: 'Revisa la construcción y colocación final según el reglamento', points: 0 },
    ],
    note: 'La misión 15 suele depender de la construcción final del modelo y la posición específica.',
  },
];

const precisionTable = [
  { fichas: 6, puntos: 50, penal: 0 },
  { fichas: 5, puntos: 50, penal: 0 },
  { fichas: 4, puntos: 35, penal: -15 },
  { fichas: 3, puntos: 25, penal: -25 },
  { fichas: 2, puntos: 15, penal: -35 },
  { fichas: 1, puntos: 10, penal: -40 },
  { fichas: 0, puntos: 0, penal: -50 },
];

const state = { precisionIndex: 0 };

function formatSigned(value) {
  return value > 0 ? `+${value}` : String(value);
}

function renderMissions() {
  const container = document.getElementById('missions');

  container.innerHTML = missions
    .map((mission, missionIndex) => {
      const maxPoints = mission.variations.reduce((sum, item) => sum + item.points, 0);

      return `
        <article class="mission-card" data-mission-index="${missionIndex}">
          <div class="mission-top">
            <div>
              <span class="mission-number">Misión ${missionIndex + 1}</span>
              <h3>${mission.title}</h3>
              <span class="small-name">${mission.english}</span>
            </div>
            <span class="mission-max">Máx. ${maxPoints} pts</span>
          </div>

          <ul class="mission-list">
            ${mission.variations
              .map(
                (variation, variationIndex) => `
                  <li class="mission-item">
                    <input
                      type="checkbox"
                      data-mission-index="${missionIndex}"
                      data-variation-index="${variationIndex}"
                      data-points="${variation.points}"
                      id="mission-${missionIndex}-${variationIndex}"
                    />
                    <label for="mission-${missionIndex}-${variationIndex}">
                      ${variation.label}
                      <span class="points-tag"> (${formatSigned(variation.points)})</span>
                    </label>
                  </li>
                `
              )
              .join('')}
          </ul>

          ${mission.note ? `<p class="mission-note">${mission.note}</p>` : ''}
        </article>
      `;
    })
    .join('');

  document.querySelectorAll('#missions input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', updateScore);
  });
}

function renderPrecision() {
  const container = document.getElementById('precision-options');

  container.innerHTML = precisionTable
    .map(
      (option, index) => `
        <label class="precision-option ${index === state.precisionIndex ? 'selected' : ''}">
          <input type="radio" name="precision" value="${index}" ${index === state.precisionIndex ? 'checked' : ''} />
          <strong>${option.fichas} fichas</strong>
          <span>${option.puntos} puntos</span>
          <em>${formatSigned(option.penal)} restados</em>
        </label>
      `
    )
    .join('');

  document.querySelectorAll('input[name="precision"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      state.precisionIndex = Number(radio.value);
      renderPrecision();
      updateScore();
    });
  });
}

function updateScore() {
  let missionPoints = 0;

  document.querySelectorAll('#missions input[type="checkbox"]').forEach((checkbox) => {
    if (checkbox.checked) {
      missionPoints += Number(checkbox.dataset.points || 0);
    }
  });

  const precision = precisionTable[state.precisionIndex];
  const precisionTotal = precision.puntos + precision.penal;
  const total = missionPoints + precisionTotal;

  document.getElementById('mission-total').textContent = missionPoints;
  document.getElementById('precision-total').textContent = precisionTotal;
  document.getElementById('total-score').textContent = total;
  document.getElementById('summary-total').textContent = total;

  document.querySelectorAll('.mission-card').forEach((card) => {
    const hasCheckedItem = card.querySelector('input:checked');
    card.classList.toggle('active', Boolean(hasCheckedItem));
  });
}

function resetScore() {
  document.querySelectorAll('#missions input[type="checkbox"]').forEach((checkbox) => {
    checkbox.checked = false;
  });

  state.precisionIndex = 0;
  renderPrecision();
  updateScore();
}

document.getElementById('reset').addEventListener('click', resetScore);

renderMissions();
renderPrecision();
updateScore();
