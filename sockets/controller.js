const TiketControl = require("../models/ticket-control");

const ticketControl = new TiketControl();

const socketController = (socket) => {

    socket.emit('ultimo-ticket', ticketControl.ultimo);
    socket.emit('estado-actual', ticketControl.ultimos4);
    socket.emit('tickets-pendientes', ticketControl.tickets.length);

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguiente();
        callback(siguiente);

        //TODO: Notificar que hay un nuevo ticket pendiente de asignar
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

    });

    socket.on('atender-ticket',({escritorio},callback) => {
        if (!escritorio) {
            return callback({
                ok:false,
                msg:'El escritorio es obligatorio'
            });            
        }

        const ticket = ticketControl.atenderTicket(escritorio);

        socket.broadcast.emit('estado-actual',ticketControl.ultimos4);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);    
        socket.emit('tickets-pendientes', ticketControl.tickets.length);    

        if (!ticket) {
            callback({
                ok:false,
                msg: 'Ya no existen tickets que atender'
            });
        }else{
            callback({
                ok: true,
                ticket
            });
        }
    })

}



module.exports = {
    socketController
}

