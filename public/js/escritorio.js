const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');    
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText=escritorio;
divAlert.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    
    btnAtender.disabled=false;
});

socket.on('ultimo-ticket',(ultimo)=>{
    //lblNuevoTicket.innerText = 'Tiket '+ultimo;
})

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});


btnAtender.addEventListener( 'click', () => {

     socket.emit( 'atender-ticket', {escritorio}, ( {ok,ticket,msg} ) => {
         if (!ok) {
            lblTicket.innerText =  'Nadie.';
            return divAlert.style.display = '';
         }

         lblTicket.innerText =  'Ticket '+ticket.numero;
    });

});