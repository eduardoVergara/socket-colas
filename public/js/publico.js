//referencias HTML
const lblTicket1 = document.querySelector("#lblTicket1");
const lblTicket2 = document.querySelector("#lblTicket2");
const lblTicket3 = document.querySelector("#lblTicket3");
const lblTicket4 = document.querySelector("#lblTicket4");
const lblEscritorio1 = document.querySelector("#lblEscritorio1");
const lblEscritorio2 = document.querySelector("#lblEscritorio2");
const lblEscritorio3 = document.querySelector("#lblEscritorio3");
const lblEscritorio4 = document.querySelector("#lblEscritorio4");

const socket = io();

socket.on("estado-actual", (payload) => {
  const [tiket1, tiket2, tiket3, tiket4] = payload;
  if (tiket1) {
    lblTicket1.innerText = "Tiket " + tiket1.numero;
    lblEscritorio1.innerText = tiket1.escritorio;
  }
  if (tiket2) {
    lblTicket2.innerText = "Tiket " + tiket2.numero;
    lblEscritorio2.innerText = tiket2.escritorio;
  }
  if (tiket3) {
    lblTicket3.innerText = "Tiket " + tiket3.numero;
    lblEscritorio3.innerText = tiket3.escritorio;
  }
  if (tiket4) {
    lblTicket4.innerText = "Tiket " + tiket4.numero;
    lblEscritorio4.innerText = tiket4.escritorio;
  }
});
