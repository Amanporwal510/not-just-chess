import { socket } from "../connection/socket";

export function checkGameOver(game, setGameOver, setGameOverMessage) {

   if(!game.game_over()) return;

   setGameOver(true);
   
   if(game.in_stalemate()) {
      setGameOverMessage("Draw by Stalemate");
   }
   else if (game.insufficient_material()) {
      setGameOverMessage("Draw by Insufficent Material");
   }
   else if (game.in_threefold_repetition()) {
      setGameOverMessage("Draw by Threefold Repetition");
   }
   else if (game.in_checkmate() && game.history().length&1) {
      setGameOverMessage("White wins by Checkmate");
   }
   else {
      setGameOverMessage("Black wins by Checkmate");
   }
}

export function safeGameMutate(setGame, modify) {
   setGame((g) => {
     const update = { ...g };
     modify(update);
     return update;
   });
}

export function isSafeMove(setGame, sourceSquare, targetSquare) {
   let move = null;
   safeGameMutate(setGame, (game) => {
      move = game.move({
         from: sourceSquare,
         to: targetSquare,
         promotion: "q", // always promote to a queen for example simplicity
      });
   });

   if (move === null) return false; // illegal move
   
   return true; // legal move
}

export function makeOpponentMove(game, move, setGame, setGameOver, setGameOverMessage) {
   safeGameMutate(setGame, (_game) => {
      _game.move({
         from: move.from,
         to: move.to,
         promotion: "q", // always promote to a queen for example simplicity
      });
   });

   checkGameOver(game, setGameOver, setGameOverMessage);
}

export function onDropUtil(game, sourceSquare, targetSquare, gameInfo, isGameOver, setGame, setGameOver, setGameOverMessage) {

   const { isWhite, gameId } = gameInfo;

   // console.log({ "iswhite" : isWhite, "length": game.history(), "gameInfo": gameInfo })
   if(!(isWhite ^ game.history().length&1) || isGameOver) return;
   
   if(!isSafeMove(setGame, sourceSquare, targetSquare)) return;
 
   socket.emit("new-move", {gameId, from: sourceSquare, to: targetSquare});

   checkGameOver(game, setGameOver, setGameOverMessage);
}