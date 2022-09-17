import { socket } from './socket'
import Peer from "simple-peer";

function callPeer(opponentId, stream, opponentVideoRef) {
   const peer = new Peer({
     initiator: true,
     trickle: false,
     stream: stream,
   });

   peer.on("signal", data => {
     socket.emit("call-opponent", { userToCall: opponentId, signalData: data, from: socket.id})
   })

   peer.on("stream", stream => {
     if (opponentVideoRef.current) {
      opponentVideoRef.current.srcObject = stream;
     }
   });

   socket.removeAllListeners("call-accepted");
   socket.on("call-accepted", signal => {
      console.log("call-accepted", peer)
      peer.signal(signal);
   })

}

function acceptPeer(opponentId, stream, signal, opponentVideoRef) {
   console.log("acceptPeer")
   const peer = new Peer({
     initiator: false,
     trickle: false,
     stream: stream,
   });

   peer.on("signal", data => {
      console.log("accept-peer-signal")
     socket.emit("accept-call", { signal: data, to: opponentId })
   })

   peer.on("stream", stream => {
      if (opponentVideoRef.current) {
         console.log(stream)
         opponentVideoRef.current.srcObject = stream;
      }
   });

   peer.signal(signal);
}

export {
   callPeer,
   acceptPeer
}