import '../styles/globals.css'
import { createContext, useState, useEffect } from "react";
import { socket } from '../connection/socket'

function MyApp({ Component, pageProps }) {
   const [ gameInfo, setGameInfo ] = useState({ 
      opponentSocketId: null,
      isWhite: null,
      gameId: null,
      canStartGame: false
   });
   const DataContext = createContext();

   useEffect(() => {
      socket.removeAllListeners("get-opponent-socket-id");
      socket.on("get-opponent-socket-id", (options) => {
         // setGameInfo({ ...gameInfo, opponentSocketId: options.opponentSocketId })
         setGameInfo( (prevState) => {
            return {
               ...prevState,
               opponentSocketId: options.opponentSocketId
            }
         })
         console.log("get-opponent-socket-id", options)
      })

      socket.removeAllListeners("challenge-accepted");
      socket.on('challenge-accepted', (options) => {
         console.log('challenge-accepted', options)
         const { isWhite, gameId, opponentSocketId } = options
         // setGameInfo({ ...gameInfo, isWhite, gameId, opponentSocketId, canStartGame: true })
         setGameInfo( (prevState) => {
            return {
               ...prevState,
               isWhite,
               gameId,
               opponentSocketId,
               canStartGame: true
            }
         })
      })
   },[])

  return <DataContext.Provider value={{ gameInfo, setGameInfo }}>
      <Component {...pageProps} DataContext={DataContext} />
   </DataContext.Provider>
}

export default MyApp
