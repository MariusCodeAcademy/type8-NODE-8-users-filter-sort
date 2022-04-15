const BASE_URL = 'http://localhost:3000/api';

const listEl = document.getElementById('list');

function renderUsers(userArr) {
  const listString = userArr
    .map(
      (uObj) => `
      <li>
      <p><strong>${uObj.name}</strong> Is ${uObj.age} year old ${
        uObj.isStudent ? 'student' : ''
      }. <i>Gender:</i> ${uObj.gender}</p>
      </li>
  `
    )
    .join('');
  listEl.innerHTML = listString;
}

async function getUsers() {
  const resp = await fetch(`${BASE_URL}/users`);
  const dataInJs = await resp.json();
  console.log('dataInJs ===', dataInJs);
  renderUsers(dataInJs);
}

getUsers();
