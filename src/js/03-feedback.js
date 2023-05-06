import throttle from 'lodash.throttle';
const KEY = 'feedback-form-state';
let savedData = JSON.parse(localStorage.getItem(KEY)) || {};

const formEl = document.querySelector('.feedback-form');
formEl.addEventListener('input', throttle(saveValue,500));
formEl.addEventListener('submit', sendData);

function saveValue(evt) {
  savedData[evt.target.name] = evt.target.value;

  localStorage.setItem(KEY, JSON.stringify(savedData));
}
if (savedData) {
  formEl.elements.email.value = savedData.email || '';
  formEl.elements.message.value = savedData.message || '';
}
function sendData(evt) {
  evt.preventDefault();
  if (savedData.email === '' || savedData.message === '') {
    alert('Fill all fields');
    return;
  }
  console.log(savedData);
  localStorage.removeItem(KEY);
  savedData = {};
  formEl.reset();
}
