const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');

// const readbutton = document.querySelector('.readbutton');
// const fullarticle = document.querySelector('.fullarticle');
// const buttonclose = document.querySelector('.fullarticle button');

hamburger.addEventListener('click', () => nav.classList.toggle('active'));

// readbutton.onclick = function () {
//   fullarticle.showModal();
// };

// buttonclose.onclick = function () {
//   fullarticle.close();
// };
