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

const state = {
  precisionIndex: 0,
  currentTeam: null,
};

let chart = null;

function formatSigned(value) {
  return value > 0 ? `+${value}` : String(value);
}

function initializeStorage() {
  if (!localStorage.getItem('fll_teams')) {
    localStorage.setItem('fll_teams', JSON.stringify({}));
  }
}

function getTeams() {
  const teams = localStorage.getItem('fll_teams');
  return teams ? JSON.parse(teams) : {};
}

function saveTeam(name, number, history = []) {
  const teams = getTeams();
  const key = number;
  teams[key] = { name, number, history };
  localStorage.setItem('fll_teams', JSON.stringify(teams));
}

function getTeamHistory(number) {
  const teams = getTeams();
  return teams[number]?.history || [];
}

function addScore(number, score) {
  const teams = getTeams();
  const team = teams[number];
  if (team) {
    const timestamp = new Date().toLocaleString('es-ES');
    team.history.push({ score, timestamp });
    saveTeam(team.name, number, team.history);
  }
}

function registerTeam() {
  const name = document.getElementById('nombre-equipo').value.trim();
  const number = document.getElementById('numero-equipo').value.trim();

  if (!name || !number) return;

  saveTeam(name, number, []);
  state.currentTeam = number;
  displayTeamInfo();
  closeModal();
  showStatsPanel();
  document.getElementById('nombre-equipo').value = '';
  document.getElementById('numero-equipo').value = '';
}

function displayTeamInfo() {
  const teams = getTeams();
  const team = teams[state.currentTeam];

  if (team) {
    document.getElementById('team-name').textContent = team.name;
    document.getElementById('team-number').textContent = `Equipo: ${team.number}`;
    document.getElementById('team-info').classList.remove('hidden');
  }
}

function closeModal() {
  document.getElementById('modal-registro').classList.add('hidden');
}

function openModal() {
  document.getElementById('modal-registro').classList.remove('hidden');
}

function changeTeam() {
  state.currentTeam = null;
  resetScore();
  document.getElementById('team-info').classList.add('hidden');
  document.getElementById('stats-panel').classList.add('hidden');
  openModal();
}

function showStatsPanel() {
  if (state.currentTeam) {
    document.getElementById('stats-panel').classList.remove('hidden');
    updateStats();
  }
}

function updateStats() {
  const history = getTeamHistory(state.currentTeam);

  if (history.length === 0) {
    document.getElementById('stat-intentos').textContent = '0';
    document.getElementById('stat-mejor').textContent = '0';
    document.getElementById('stat-promedio').textContent = '0';
    document.getElementById('stat-anterior').textContent = '-';
    document.getElementById('historial-tbody').innerHTML = '';
    return;
  }

  const scores = history.map((h) => h.score);
  const mejor = Math.max(...scores);
  const promedio = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(0);
  const anterior = scores.length > 1 ? scores[scores.length - 2] : '-';

  document.getElementById('stat-intentos').textContent = history.length;
  document.getElementById('stat-mejor').textContent = mejor;
  document.getElementById('stat-promedio').textContent = promedio;
  document.getElementById('stat-anterior').textContent = anterior;

  const tbody = document.getElementById('historial-tbody');
  tbody.innerHTML = history
    .map((entry, index) => {
      let cambio = '-';
      let cambioClass = 'change-neutral';
      if (index > 0) {
        const diff = entry.score - history[index - 1].score;
        if (diff > 0) {
          cambio = `+${diff}`;
          cambioClass = 'change-up';
        } else if (diff < 0) {
          cambio = `${diff}`;
          cambioClass = 'change-down';
        } else {
          cambio = '=';
        }
      }
      return `
        <tr>
          <td>${index + 1}</td>
          <td>${entry.timestamp}</td>
          <td><strong>${entry.score}</strong></td>
          <td class="${cambioClass}">${cambio}</td>
        </tr>
      `;
    })
    .join('');

  updateChart(scores, history.map((h) => h.timestamp.split(',')[0]));
}

function updateChart(scores, labels) {
  const ctx = document.getElementById('score-chart').getContext('2d');

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Puntaje',
          data: scores,
          borderColor: '#2a9d8f',
          backgroundColor: 'rgba(42, 157, 143, 0.1)',
          borderWidth: 2,
          fill: true,
          pointRadius: 5,
          pointBackgroundColor: '#d86d43',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            font: { weight: 'bold', size: 12 },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { font: { size: 11 } },
          grid: { color: '#e5ebf2' },
        },
        x: {
          ticks: { font: { size: 10 } },
          grid: { display: false },
        },
      },
    },
  });
}

function clearStats() {
  if (confirm('¿Estás seguro de que deseas limpiar el historial del equipo?')) {
    saveTeam(getTeams()[state.currentTeam].name, state.currentTeam, []);
    updateStats();
  }
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

function saveScore() {
  if (!state.currentTeam) {
    alert('Por favor, registra un equipo primero.');
    return;
  }

  const score = Number(document.getElementById('total-score').textContent);
  addScore(state.currentTeam, score);
  resetScore();
  updateStats();
  alert(`Puntaje ${score} guardado para el equipo!`);
}

function resetScore() {
  document.querySelectorAll('#missions input[type="checkbox"]').forEach((checkbox) => {
    checkbox.checked = false;
  });

  state.precisionIndex = 0;
  renderPrecision();
  updateScore();
}

document.getElementById('form-registro').addEventListener('submit', (e) => {
  e.preventDefault();
  registerTeam();
});

document.getElementById('btn-cambiar-equipo').addEventListener('click', changeTeam);
document.getElementById('btn-limpiar-estadisticas').addEventListener('click', clearStats);
document.getElementById('save-score').addEventListener('click', saveScore);
document.getElementById('reset').addEventListener('click', resetScore);

initializeStorage();
renderMissions();
renderPrecision();
updateScore();
openModal();
