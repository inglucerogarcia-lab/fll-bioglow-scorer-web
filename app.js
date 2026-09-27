const missions = [
  {name:'Drone Survey', items:[['El dron está completamente fuera del tapete',20],['Se voltea el mapa LiDAR',10]]},
  {name:'Exploding Seeds', items:[['Se retira la primera semilla del fruto',10],['Se retira la segunda semilla del fruto',10],['Se retira la tercera semilla del fruto',10]]},
  {name:'Flip the Rock', items:[['Se derriba la bandera de investigación',20],['La roca regresa a la zona de lanzamiento',10]]},
  {name:'Lucky Leaves', items:[['Se retira la primera hoja y el saltamontes permanece en su sitio',10],['Se retira la segunda hoja y el saltamontes permanece en su sitio',20]]},
  {name:'Reaching Roots', items:[['La raíz cruza parcialmente el límite',10],['La raíz está completamente extendida',20]]},
  {name:'Leafcutter Frenzy', items:[['La hormiga vuelve al nido con el fragmento dentro',10],['La hormiga vuelve al nido con el segundo fragmento dentro',10]]},
  {name:'Humongous Fungus', items:[['Se extiende el micelio',20],['Conexión con otro equipo (por conexión)',10]]},
  {name:'Tangled', items:[['Se retira la enredadera y queda sobre el tapete',30]]},
  {name:'Research Platform', items:[['Se eleva la plataforma',10],['Se despliega la cámara trampa',10],['Se retira la semilla',10]]},
  {name:'Fragile Microhabitats', items:[['La araña permanece en su sitio',10],['El caracol permanece en su sitio',10]]},
  {name:'Window to the Past', items:[['Se abre la cubierta de raíces y queda plana sobre el tapete',20]]},
  {name:'Forest Elder', items:[['Se eleva el bastón / se sostiene el árbol viejo',20],['Se añade el lazo de soporte',10]]},
  {name:'Keystone Species', items:[['Misión de acoplamiento: coloca el modelo en la posición indicada',0]], note:'Consulta el reglamento oficial para las condiciones y puntos de esta misión.'},
  {name:'Seeds of Renewal', items:[['Usa las semillas obtenidas en misiones anteriores según la combinación indicada',0]], note:'Consulta el reglamento oficial para las combinaciones y puntos.'},
  {name:'Biocentric Architecture', items:[['Construye o coloca el modelo según la condición sostenible indicada',0]], note:'Consulta el reglamento oficial para las condiciones y puntos.'}
];
const precision = [{n:6,points:50,penalty:0},{n:5,points:50,penalty:0},{n:4,points:35,penalty:-15},{n:3,points:25,penalty:-25},{n:2,points:15,penalty:-35},{n:1,points:10,penalty:-40},{n:0,points:0,penalty:-50}];
const state={mission:0,precision:0};
const money=n=>n>0?`+${n}`:n;
function renderMissions(){document.querySelector('#missions').innerHTML=missions.map((m,i)=>`<article class="mission-card" data-mission="${i}"><div class="mission-header"><div><span class="mission-number">MISIÓN ${i+1}</span><h3>${m.name}</h3></div><span class="max">${m.items.reduce((a,x)=>a+x[1],0)} pts</span></div><ul>${m.items.map((x,j)=>`<li><input type="checkbox" data-points="${x[1]}" data-mission="${i}" id="m${i}-${j}"><label for="m${i}-${j}">${x[0]} <b>(${money(x[1])})</b></label></li>`).join('')}</ul>${m.note?`<p class="precision-note">${m.note}</p>`:''}</article>`).join('');
 document.querySelectorAll('[data-mission]').forEach(el=>el.addEventListener('change',update));}
function renderPrecision(){document.querySelector('#precision-options').innerHTML=precision.map((p,i)=>`<label class="precision-option ${i===0?'selected':''}"><input type="radio" name="precision" value="${i}" ${i===0?'checked':''}><strong>${p.n} fichas</strong><span>${p.points} puntos</span><em>${money(p.penalty)} restados</em></label>`).join('');document.querySelectorAll('input[name=precision]').forEach(r=>r.addEventListener('change',()=>{state.precision=+r.value;document.querySelectorAll('.precision-option').forEach((x,i)=>x.classList.toggle('selected',i===state.precision));update();}));}
function update(){let mission=0;document.querySelectorAll('#missions input[type=checkbox]').forEach(x=>{if(x.checked)mission+=+x.dataset.points;});const p=precision[state.precision],total=mission+p.points+p.penalty;document.querySelector('#mission-total').textContent=mission;document.querySelector('#precision-total').textContent=p.points+p.penalty;document.querySelector('#total-score').textContent=total;document.querySelector('#summary-total').textContent=total;document.querySelectorAll('.mission-card').forEach(c=>c.classList.toggle('active',c.querySelector('input:checked')));}
document.querySelector('#reset').addEventListener('click',()=>{document.querySelectorAll('#missions input').forEach(x=>x.checked=false);document.querySelector('input[name=precision]').checked=true;state.precision=0;document.querySelectorAll('.precision-option').forEach((x,i)=>x.classList.toggle('selected',i===0));update();});
renderMissions();renderPrecision();update();
