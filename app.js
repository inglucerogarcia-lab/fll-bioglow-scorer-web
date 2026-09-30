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

const STORAGE_KEY = 'fllBioglowTeams';
const maxPossibleScore = missions.reduce((sum, mission) => {
  return sum + mission.variations.reduce((missionSum, variation) => missionSum + variation.points, 0);
}, 0) + 50;

const state = {
  precisionIndex: 0,
  teams: loadTeams(),
  selectedTeamId: null,
};

function formatSigned(value) {
  return value > 0 ? `+${value}` : String(value);
}

function loadTeams() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('No se pudieron cargar los equipos guardados.', error);
    return [];
  }
}

function saveTeams() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.teams));
}

function getCurrentScoreBreakdown() {
  let missionPoints = 0;

  document.querySelectorAll('#missions input[type="checkbox"]').forEach((checkbox) => {
    if (checkbox.checked) {
      missionPoints += Number(checkbox.dataset.points || 0);
    }
  });

  const precision = precisionTable[state.precisionIndex];
  const precisionTotal = precision.puntos + precision.penal;
  const total = missionPoints + precisionTotal;

  return { missionPoints, precisionTotal, total };
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
  const { missionPoints, precisionTotal, total } = getCurrentScoreBreakdown();

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

function getTeamStats(team) {
  const tests = Array.isArray(team.tests) ? team.tests : [];

  if (!tests.length) {
    return { tests: 0, best: 0, average: 0, last: 0, progress: 0 };
  }

  const values = tests.map((entry) => Number(entry.score || 0));
  const best = Math.max(...values);
  const average = Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
  const last = values[values.length - 1];
  const progress = Math.min(Math.round((last / maxPossibleScore) * 100), 100);

  return { tests: tests.length, best, average, last, progress };
}

function updateSelectedTeamName() {
  const selected = state.teams.find((team) => team.id === state.selectedTeamId) || null;
  const label = selected ? `${selected.name} · ${selected.school || 'Sin escuela'}` : 'Ningún equipo seleccionado';
  document.getElementById('selected-team-name').textContent = label;
}

function renderTeams() {
  const container = document.getElementById('team-list');

  if (!state.teams.length) {
    container.innerHTML = '<p class="empty-state">Aún no hay equipos registrados. Añade el primero arriba.</p>';
    updateSelectedTeamName();
    renderStats();
    return;
  }

  container.innerHTML = state.teams
    .map((team) => {
      const stats = getTeamStats(team);
      const isSelected = team.id === state.selectedTeamId;
      return `
        <article class="team-card ${isSelected ? 'selected' : ''}" data-team-id="${team.id}">
          <h4>${team.name}</h4>
          <p class="team-meta">
            ${team.school || 'Sin escuela'}<br />
            ${team.category || 'Sin categoría'}<br />
            ${team.mentor || 'Sin mentor'}
          </p>
          <div class="team-stats-mini">
            <span>Pruebas: ${stats.tests}</span>
            <span>Mejor: ${stats.best}</span>
          </div>
          <div class="team-stats-mini">
            <span>Promedio: ${stats.average}</span>
            <span>Avance: ${stats.progress}%</span>
          </div>
          <div class="team-card-actions">
            <button class="button primary select-team" data-team-id="${team.id}" type="button">${isSelected ? 'Seleccionado' : 'Seleccionar'}</button>
            <button class="button ghost danger delete-team" data-team-id="${team.id}" type="button">Eliminar</button>
          </div>
        </article>
      `;
    })
    .join('');

  document.querySelectorAll('.select-team').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.teamId;
      state.selectedTeamId = id;
      updateSelectedTeamName();
      renderTeams();
    });
  });

  document.querySelectorAll('.delete-team').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.teamId;
      state.teams = state.teams.filter((team) => team.id !== id);
      if (state.selectedTeamId === id) {
        state.selectedTeamId = state.teams[0]?.id || null;
      }
      saveTeams();
      renderTeams();
    });
  });

  updateSelectedTeamName();
  renderStats();
}

function renderStats() {
  const totalTeams = state.teams.length;
  const totalTests = state.teams.reduce((sum, team) => sum + (Array.isArray(team.tests) ? team.tests.length : 0), 0);
  const bestScore = state.teams.reduce((max, team) => {
    const teamBest = getTeamStats(team).best;
    return Math.max(max, teamBest);
  }, 0);

  const averageScore = totalTeams > 0
    ? Math.round(
        state.teams.reduce((sum, team) => {
          const teamAverage = getTeamStats(team).average;
          return sum + teamAverage;
        }, 0) / totalTeams
      )
    : 0;

  document.getElementById('total-teams').textContent = totalTeams;
  document.getElementById('total-tests').textContent = totalTests;
  document.getElementById('best-score').textContent = bestScore;
  document.getElementById('average-score').textContent = averageScore;

  const tableBody = document.getElementById('team-stats-table-body');

  if (!state.teams.length) {
    tableBody.innerHTML = '<tr><td colspan="6" class="empty-row">No hay equipos registrados todavía.</td></tr>';
    return;
  }

  const sortedTeams = [...state.teams].sort((a, b) => getTeamStats(b).best - getTeamStats(a).best);

  tableBody.innerHTML = sortedTeams
    .map((team) => {
      const stats = getTeamStats(team);
      return `
        <tr>
          <td>${team.name}</td>
          <td>${team.school || 'Sin escuela'}</td>
          <td>${stats.tests}</td>
          <td>${stats.best}</td>
          <td>${stats.average}</td>
          <td><span class="progress-pill">${stats.progress}%</span></td>
        </tr>
      `;
    })
    .join('');
}

function registerTeam(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const name = document.getElementById('team-name').value.trim();
  const school = document.getElementById('team-school').value.trim();
  const category = document.getElementById('team-category').value.trim();
  const mentor = document.getElementById('team-mentor').value.trim();

  if (!name) {
    document.getElementById('team-name').focus();
    return;
  }

  const team = {
    id: `team-${Date.now()}`,
    name,
    school,
    category,
    mentor,
    tests: [],
  };

  state.teams.push(team);
  state.selectedTeamId = team.id;
  saveTeams();
  form.reset();
  renderTeams();
}

function saveCurrentScoreForSelectedTeam() {
  const selectedTeam = state.teams.find((team) => team.id === state.selectedTeamId);

  if (!selectedTeam) {
    alert('Primero registra y selecciona un equipo para guardar la prueba.');
    return;
  }

  const { total } = getCurrentScoreBreakdown();
  const testEntry = {
    id: `score-${Date.now()}`,
    score: total,
    date: new Date().toISOString(),
    label: `Prueba ${selectedTeam.tests.length + 1}`,
  };

  selectedTeam.tests.push(testEntry);
  saveTeams();
  renderTeams();
  updateScore();
}

function bindEvents() {
  document.getElementById('team-form').addEventListener('submit', registerTeam);
  document.getElementById('save-score').addEventListener('click', saveCurrentScoreForSelectedTeam);
  document.getElementById('reset').addEventListener('click', resetScore);
}

document.addEventListener('DOMContentLoaded', () => {
  if (state.teams.length && !state.selectedTeamId) {
    state.selectedTeamId = state.teams[0].id;
  }

  renderMissions();
  renderPrecision();
  renderTeams();
  bindEvents();
  updateScore();
});

renderMissions();
renderPrecision();
renderTeams();
bindEvents();
updateScore();

if (state.teams.length && !state.selectedTeamId) {
  state.selectedTeamId = state.teams[0].id;
}
