// require('dotenv').config()
// import dotenv from 'dotenv'
// dotenv.config()
import io from 'socket.io-client'
const socket = io(process.env.Socket_URL, { transports : ['websocket'] });


socket.on("game-created", (options) => {
   console.log("game-created", options)
})
socket.on("game-joined", (options) => {
   console.log("game-joined", options)
})

export {
    socket
}