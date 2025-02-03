import { WebSocketServer ,WebSocket} from "ws";

const wss = new WebSocketServer({port:8086});

interface User {
    socket:WebSocket,
    room :string,
}
let allSockets : User[] = [];

wss.on("connection",(socket) => {
    // allSockets.push(socket);
    console.log("user connected ");

    socket.on("message",(message) => {
        // console.log("message received " + message.toString());
        // allSockets.forEach((s)=>{
        //     s.send(message.toString() + ":sent from server");
        // })

        const parsedMessage = JSON.parse(message as unknown as string);
        if(parsedMessage.type === "join"){
            allSockets.push({
                socket,
                room : parsedMessage.payload.roomId
            })
        }

        if(parsedMessage.type === "chat"){
            const currentRoom = allSockets.find((x) => x.socket === socket)?.room;
            allSockets.forEach((e)=>{
                if(e.room == currentRoom ){
                    e.socket.send(parsedMessage.payload.message)
                }
            })
        }
    })

    // const newLocal = socket.on("disconnect", () => {
    //     allSockets.filter(x => x != socket);
    // });;
})