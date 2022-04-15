const BASE_URL = 'http://localhost:3000/api';

const listEl = document.getElementById('list');
const sortAgeBtn = document.getElementById('ageSort');
const orderDispEl = sortAgeBtn.querySelector('span');

let sortOrder = 'DESC';
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

getUsers('users/sort-age/ASC');

sortAgeBtn.addEventListener('click', () => {
  // kai paspaudiam mygtuka pakeisti jame esanti zodeli ASC i DESC

  getUsers(`users/sort-age/${sortOrder}`);

  sortOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC';
  orderDispEl.textContent = sortOrder;
  console.log('sorting');
});
