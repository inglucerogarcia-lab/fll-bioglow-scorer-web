const missions = [
  {
    title: 'Drones exploradores',
    english: 'Drone Survey',
    theme: 'drone',
    variations: [
      { label: 'El dron queda completamente fuera del tapete', points: 20 },
      { label: 'Se gira o se voltea el mapa LiDAR para bonus', points: 10 },
    ],
  },
  {
    title: 'Balocoria',
    english: 'Balocoria',
    theme: 'balocoria',
    variations: [
      { label: 'Se retira la primera semilla del casco', points: 10 },
      { label: 'Se retira la segunda semilla del casco', points: 10 },
      { label: 'Se retira la tercera semilla del casco', points: 10 },
    ],
  },
  {
    title: 'Volteo de roca',
    english: 'Flip the Rock',
    theme: 'rock',
    variations: [
      { label: 'Se derriba la bandera de investigación', points: 20 },
      { label: 'La roca vuelve a la zona de inicio o posición válida', points: 10 },
    ],
  },
  {
    title: 'Hojas de la suerte',
    english: 'Lucky Leaves',
    theme: 'leaves',
    variations: [
      { label: 'Se retira la primera hoja y el saltamontes sigue en su sitio', points: 10 },
      { label: 'Se retira la segunda hoja y el saltamontes sigue en su sitio', points: 20 },
    ],
  },
  {
    title: 'Extensión de raíces',
    english: 'Reaching Roots',
    theme: 'roots',
    variations: [
      { label: 'La raíz cruza parcialmente el límite', points: 10 },
      { label: 'La raíz queda completamente extendida', points: 20 },
    ],
  },
  {
    title: 'Frenesí de hojas',
    english: 'Leafcutter Frenzy',
    theme: 'leafcutter',
    variations: [
      { label: 'La hormiga vuelve al nido con un fragmento dentro', points: 10 },
      { label: 'La hormiga vuelve al nido con otro fragmento dentro', points: 10 },
    ],
  },
  {
    title: 'Hongo gigantesco',
    english: 'Humongous Fungus',
    theme: 'fungus',
    variations: [
      { label: 'Se extiende el micelio', points: 20 },
      { label: 'Conexión con otro equipo', points: 10 },
    ],
  },
  {
    title: 'Enredo',
    english: 'Tangled',
    theme: 'vine',
    variations: [
      { label: 'Se retira la enredadera y queda sobre el tapete', points: 30 },
    ],
  },
  {
    title: 'Torre de observación',
    english: 'Research Platform',
    theme: 'tower',
    variations: [
      { label: 'Se eleva la plataforma', points: 10 },
      { label: 'Se despliega la cámara trampa', points: 10 },
      { label: 'Se retira la semilla', points: 10 },
    ],
  },
  {
    title: 'Microhábitats frágiles',
    english: 'Fragile Microhabitats',
    theme: 'microhabitat',
    variations: [
      { label: 'La araña permanece en su sitio', points: 10 },
      { label: 'El caracol permanece en su sitio', points: 10 },
    ],
  },
  {
    title: 'Ventana al pasado',
    english: 'Window to the Past',
    theme: 'window',
    variations: [
      { label: 'Se abre la cubierta de raíces y queda plana sobre el tapete', points: 20 },
    ],
  },
  {
    title: 'Ancestros de la selva',
    english: 'Forest Elder',
    theme: 'forest',
    variations: [
      { label: 'Se eleva el palo o soporte del árbol viejo', points: 20 },
      { label: 'Se añade el lazo de soporte', points: 10 },
    ],
  },
  {
    title: 'Especies clave',
    english: 'Keystone Species',
    theme: 'species',
    variations: [
      { label: 'Verifica la misión en el reglamento oficial de FIRST', points: 0 },
    ],
    note: 'La misión 13 requiere confirmar la condición exacta y el valor de puntos según la versión oficial del reglamento.',
  },
  {
    title: 'Semillas de renovación',
    english: 'Seeds of Renewal',
    theme: 'renewal',
    variations: [
      { label: 'Verifica la combinación exacta y la puntuación oficial', points: 0 },
    ],
    note: 'La misión 14 depende de las semillas y combinaciones obtenidas en misiones previas.',
  },
  {
    title: 'Arquitectura biocéntrica',
    english: 'Biocentric Architecture',
    theme: 'architecture',
    variations: [
      { label: 'Revisa la construcción y colocación final según el reglamento', points: 0 },
    ],
    note: 'La misión 15 suele depender de la construcción final del modelo y la posición específica.',
  },
];

function missionArtSvg(theme, index) {
  const base = {
    drone: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="120" fill="#dfeec8"/><path d="M36 86 L80 22 L118 86" stroke="#2f3b2e" stroke-width="4" fill="none"/><path d="M80 22 L80 86" stroke="#2f3b2e" stroke-width="4"/><rect x="68" y="42" width="24" height="30" fill="#e2d16d" stroke="#2f3b2e" stroke-width="2"/><circle cx="80" cy="24" r="8" fill="#ef4444"/><circle cx="80" cy="24" r="3" fill="#fff"/><path d="M26 86 L80 70 L134 86" stroke="#2f3b2e" stroke-width="3" fill="none"/><rect x="46" y="80" width="68" height="18" rx="4" fill="#5c6d5c"/></svg>`,
    balocoria: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="120" fill="#dfeec8"/><circle cx="80" cy="60" r="32" fill="#9ad39f" stroke="#2f3b2e" stroke-width="3"/><path d="M52 60 C60 38, 100 38, 108 60" stroke="#2f3b2e" stroke-width="3" fill="none"/><rect x="72" y="12" width="16" height="30" fill="#d4b144"/><rect x="56" y="42" width="48" height="12" fill="#7a8f3d"/><path d="M40 90 L58 60 L101 60 L120 90" fill="#8dc56d" stroke="#2f3b2e" stroke-width="2"/><circle cx="52" cy="40" r="7" fill="#cc7a4e"/></svg>`,
    rock: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="120" fill="#dfeec8"/><rect x="34" y="72" width="90" height="16" rx="3" fill="#99a3a6"/><path d="M50 72 L86 44 L122 72" fill="#d15a57" stroke="#2f3b2e" stroke-width="3"/><rect x="65" y="46" width="16" height="22" fill="#5f7d44"/><rect x="82" y="46" width="12" height="22" fill="#5f7d44"/><path d="M44 82 L118 82" stroke="#5f7d44" stroke-width="4"/></svg>`,
    leaves: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="120" fill="#dfeec8"/><path d="M30 88 C48 40, 92 18, 128 84" fill="none" stroke="#2f3b2e" stroke-width="4"/><path d="M28 72 C48 62, 60 46, 72 30" fill="none" stroke="#2f3b2e" stroke-width="3"/><path d="M74 30 C92 46, 110 58, 132 72" fill="none" stroke="#2f3b2e" stroke-width="3"/><path d="M54 88 C58 54, 64 38, 78 22" stroke="#b7d859" stroke-width="6" fill="none"/><path d="M78 22 C86 38, 92 54, 100 88" stroke="#b7d859" stroke-width="6" fill="none"/></svg>`,
    roots: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="120" fill="#dfeec8"/><rect x="16" y="34" width="128" height="48" rx="4" fill="#5b7e52"/><path d="M24 82 L24 26" stroke="#2f3b2e" stroke-width="4"/><path d="M54 82 L54 42" stroke="#2f3b2e" stroke-width="4"/><path d="M90 82 L90 36" stroke="#2f3b2e" stroke-width="4"/><path d="M120 82 L120 26" stroke="#2f3b2e" stroke-width="4"/><path d="M24 26 L50 26" stroke="#2f3b2e" stroke-width="4"/><path d="M90 36 L120 36" stroke="#2f3b2e" stroke-width="4"/></svg>`,
    leafcutter: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="120" fill="#dfeec8"/><path d="M38 86 C60 56, 86 46, 124 72" fill="none" stroke="#2f3b2e" stroke-width="4"/><circle cx="114" cy="62" r="12" fill="#c9a935"/><path d="M48 82 L62 54 L92 66" fill="none" stroke="#7d9455" stroke-width="3"/><circle cx="78" cy="90" r="8" fill="#d95d5d"/><path d="M20 90 L44 80" stroke="#2f3b2e" stroke-width="3"/><path d="M90 90 L118 80" stroke="#2f3b2e" stroke-width="3"/></svg>`,
    fungus: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="120" fill="#dfeec8"/><path d="M66 70 C46 52, 46 26, 80 22 C114 26, 110 52, 94 70" fill="#c9d97f" stroke="#2f3b2e" stroke-width="3"/><path d="M80 70 L80 90" stroke="#2f3b2e" stroke-width="4"/><path d="M72 86 Q62 96 46 90" stroke="#2f3b2e" stroke-width="3" fill="none"/><path d="M88 86 Q98 94 114 90" stroke="#2f3b2e" stroke-width="3" fill="none"/><path d="M40 90 L80 60 L120 90" fill="none" stroke="#3b724a" stroke-width="3"/><circle cx="58" cy="42" r="8" fill="#d95d5d"/></svg>`,
    vine: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="120" fill="#dfeec8"/><path d="M80 20 C90 38, 96 52, 104 90" stroke="#5a7f4a" stroke-width="8" fill="none"/><path d="M55 28 C70 40, 74 54, 82 90" stroke="#5a7f4a" stroke-width="8" fill="none"/><path d="M104 52 C118 58, 128 70, 136 86" stroke="#5a7f4a" stroke-width="8" fill="none"/><rect x="40" y="84" width="80" height="12" rx="4" fill="#585d3a"/></svg>`,
    tower: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="120" fill="#dfeec8"/><rect x="34" y="52" width="92" height="42" rx="5" fill="#8dc76f" stroke="#2f3b2e" stroke-width="2"/><rect x="62" y="26" width="36" height="26" fill="#c99a4a"/><rect x="70" y="16" width="20" height="18" fill="#d8dcc3"/><path d="M24 92 L134 92" stroke="#2f3b2e" stroke-width="4"/><path d="M118 52 L128 34 L140 52" fill="#718c51" stroke="#2f3b2e" stroke-width="2"/></svg>`,
    microhabitat: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="120" fill="#dfeec8"/><rect x="22" y="28" width="116" height="60" rx="3" fill="#eef1eb" stroke="#2f3b2e" stroke-width="2"/><circle cx="60" cy="58" r="12" fill="#4b4f52"/><path d="M74 60 C90 48, 118 48, 118 60 C118 74, 94 76, 82 74" fill="#8fcc7d" stroke="#2f3b2e" stroke-width="2"/><circle cx="100" cy="62" r="9" fill="#d7d7b0"/><path d="M48 16 L48 28" stroke="#2f3b2e" stroke-width="3"/><path d="M100 16 L100 28" stroke="#2f3b2e" stroke-width="3"/></svg>`,
    window: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="120" fill="#dfeec8"/><path d="M34 76 L82 38 L126 76" fill="#b8d687" stroke="#2f3b2e" stroke-width="3"/><path d="M82 38 L82 88" stroke="#2f3b2e" stroke-width="3"/><path d="M48 88 C66 64, 76 60, 82 54 C90 60, 100 66, 118 88" fill="none" stroke="#2f3b2e" stroke-width="3"/><rect x="28" y="88" width="104" height="8" fill="#8e9d61"/></svg>`,
    forest: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="120" fill="#dfeec8"/><path d="M80 76 L80 25" stroke="#2f3b2e" stroke-width="4"/><path d="M62 48 L80 32 L98 48" fill="#6ca95d" stroke="#2f3b2e" stroke-width="2"/><path d="M56 62 L80 42 L104 62" fill="#74b76a" stroke="#2f3b2e" stroke-width="2"/><path d="M48 94 L80 86 L112 94" fill="#6d8654" stroke="#2f3b2e" stroke-width="2"/><path d="M36 92 L52 78 L68 92" fill="#358c5d" stroke="#2f3b2e" stroke-width="2"/><path d="M92 92 L108 78 L124 92" fill="#358c5d" stroke="#2f3b2e" stroke-width="2"/></svg>`,
    species: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="120" fill="#dfeec8"/><rect x="28" y="42" width="104" height="52" rx="4" fill="#7e9d4e" stroke="#2f3b2e" stroke-width="3"/><path d="M46 58 L80 30 L114 58" fill="#90cf75" stroke="#2f3b2e" stroke-width="2"/><path d="M70 58 L80 90 L90 58" fill="#cce08d" stroke="#2f3b2e" stroke-width="2"/><circle cx="80" cy="26" r="8" fill="#d95d5d"/></svg>`,
    renewal: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="120" fill="#dfeec8"/><rect x="24" y="38" width="112" height="52" rx="5" fill="#6f8b52" stroke="#2f3b2e" stroke-width="2"/><path d="M44 80 C56 52, 64 38, 80 26 C96 38, 104 52, 116 80" fill="none" stroke="#3e5d39" stroke-width="3"/><circle cx="52" cy="56" r="7" fill="#d6a14c"/><circle cx="80" cy="46" r="7" fill="#d6a14c"/><circle cx="108" cy="56" r="7" fill="#d6a14c"/></svg>`,
    architecture: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="120" fill="#dfeec8"/><rect x="38" y="30" width="84" height="52" rx="4" fill="#8bb75a" stroke="#2f3b2e" stroke-width="2"/><path d="M48 82 L52 54 L78 54 L80 82" fill="#c1c4a2" stroke="#2f3b2e" stroke-width="2"/><path d="M84 82 L88 54 L112 54 L114 82" fill="#c1c4a2" stroke="#2f3b2e" stroke-width="2"/><path d="M68 30 L68 16 L92 16 L92 30" fill="#9a9482" stroke="#2f3b2e" stroke-width="2"/></svg>`
  };

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(base[theme] || base.drone)}`;
}

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
          <div class="mission-image-wrap">
            <img src="${missionArtSvg(mission.theme, missionIndex)}" alt="${mission.title}" class="mission-image" />
          </div>

          <div class="mission-content">
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
          </div>
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
