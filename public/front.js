const BASE_URL = 'http://localhost:3000/api';

const listEl = document.getElementById('list');
const sortAgeBtn = document.getElementById('ageSort');
const orderDispEl = sortAgeBtn.querySelector('span');

let sortOrder = 'ASC';
orderDispEl.textContent = sortOrder;

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

async function getUsers(urlEnd) {
  const resp = await fetch(`${BASE_URL}/${urlEnd}`);
  const dataInJs = await resp.json();
  console.log('dataInJs ===', dataInJs);
  renderUsers(dataInJs);
}

getUsers('users');

sortAgeBtn.addEventListener('click', () => {
  // kai paspaudiam mygtuka pakeisti jame esanti zodeli ASC i DESC

  sortOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC';
  orderDispEl.textContent = sortOrder;

  getUsers('users/sort-age');
  console.log('sorting');
});
