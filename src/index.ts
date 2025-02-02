import { WebSocketServer ,WebSocket} from "ws";

const wss = new WebSocketServer({port:8086});

interface User {
    socket:WebSocket,
    roomId :string,
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
                roomId : parsedMessage.payload.roomId
            })
        }

        if(parsedMessage.type === "chat"){
            const currentRoom = allSockets.find((x) => x.socket === socket)?.roomId;
            
        }
    })

    // const newLocal = socket.on("disconnect", () => {
    //     allSockets.filter(x => x != socket);
    // });;
})