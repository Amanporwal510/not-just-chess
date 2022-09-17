import React, {useState, useEffect, useRef, useContext } from 'react';

import VideoBox from './Videobox';
import useToggleState from '../hooks/useToggleState';
import { socket } from '../connection/socket';
import { callPeer, acceptPeer } from '../connection/peerconnection';


function VideoChat(props) {

   const [ isMyCameraOn, toggleMyCamera ] = useToggleState(true);
   const [ isMyMicrophoneOn, toggleMyMicrophone ] = useToggleState(false);
   const [ isOpponentCameraOn, toggleOpponentCamera ] = useToggleState(false);
   const [ isOpponentMicrophoneOn, toggleOpponentMicrophone ] = useToggleState(false);

   const [stream, setStream] = useState(null);
   const myVideoRef = useRef();
   const opponentVideoRef = useRef();

   const [callFrom, setCallFrom] = useState(null);
   const [signal, setSignal] = useState(null);

   const { gameInfo } = useContext(props.DataContext);
   const { opponentSocketId } = gameInfo;

   useEffect(() => {
      navigator.mediaDevices.getUserMedia({ video: isMyCameraOn, audio: isMyMicrophoneOn }).then(stream => {
         setStream(stream);
         if (myVideoRef.current) { myVideoRef.current.srcObject = stream; }
         callPeer(opponentSocketId, stream, opponentVideoRef);
      })
    },[]);

    useEffect(() => {
      socket.removeAllListeners("call-opponent");
      socket.on("call-opponent", (options) => {
         console.log("call-opponent", options);
         setCallFrom(options.from);
         setSignal(options.signal);
      })
    },[]);

      useEffect(() => {
         if(opponentSocketId == null || callFrom == null || signal == null) { return }
         console.log(opponentSocketId);
         acceptPeer(callFrom, stream, signal, opponentVideoRef);
      }, [callFrom, signal]);

   return (
      <>
         <VideoBox 
            camera={isMyCameraOn} 
            microphone={isMyMicrophoneOn} 
            toggleCamera={toggleMyCamera}
            toggleMicrophone={toggleMyMicrophone}
            videoRef={myVideoRef}
            stream={stream}
            myInfo={true}
         />
         <VideoBox 
            camera={isOpponentCameraOn} 
            microphone={isOpponentMicrophoneOn} 
            toggleCamera={toggleOpponentCamera}
            toggleMicrophone={toggleOpponentMicrophone}
            videoRef={opponentVideoRef}  
            stream={stream}
            myInfo={false}
         />
      </>
   );
}

export default VideoChat;