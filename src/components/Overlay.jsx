import React, { useContext } from "react";
// Importing the GameContext to access game-related state (gameOver, gameWon, score, restartGame)
import { GameContext } from "../context/GameContextProvider";

// Importing assets for score and restart button images
import Score from "../assets/images/score.png";
import RestartBtn from "../assets/images/restart-btn.png";

// Importing the Confetti component for celebrating when the player wins
import Confetti from "react-confetti";

const Overlay = () => {
  // Accessing the necessary game states and actions from the GameContext
const { gameOver, gameWon, restartGame, score } = useContext(GameContext);

  // If the game is neither over nor won, return null to avoid rendering the overlay
if (!gameOver && !gameWon) return null;

return (
    // Overlay container with absolute positioning, full screen size, and some styling
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-50 rounded-xl">
      {/* Displaying the game over or win message */}
        <h1 className="text-orange-300 text-5xl md:text-8xl font-serif font-bold mb-8">
        {/* If the game is over, show "Game Over 😥", else if the game is won, show "You Win 🎉" */}
        {gameOver ? " Game Over 😥 " : gameWon ? " You Win 🎉 " : ""}
        </h1>

      {/* Displaying the score */}
        <div className="flex items-center gap-3 mt-10">
        {/* Image of the score icon */}
        <img src={Score} alt="score" className="w-10 h-10" />
        {/* Displaying the score with styling */}
        <p className="text-4xl uppercase font-bold text-white">
            {" "}
            Your Score :{" "}
          {/* Displaying the score in a larger font and green color */}
            <span className="text-green-500 text-5xl"> {score} </span>{" "}
        </p>
        </div>

      {/* Button for restarting the game */}
        <div className="mt-10 flex justify-center items-center gap-3 bg-sidebar-background bg-center bg-contain bg-no-repeat w-64 h-20 md:h-32">
        {/* Restart button with an image and label */}
        <button onClick={restartGame} className="flex items-center gap-3">
          {/* Image for the restart button */}
            <img src={RestartBtn} alt="" className="w-8 h-8 md:w-10 md:h-10" />
          {/* Replay text */}
            <p className="text-amber-900 md:text-lg font-bold">Replay</p>
        </button>
    </div>

      {/* If the game is won, show confetti */}
        {gameWon && (
            <>
          {/* Confetti component triggered when the player wins */}
            <Confetti
                width={2000} // Width of the canvas for confetti
                height={1000} // Height of the canvas for confetti
                tweenDuration={5000} // Duration of the animation for the confetti
                numberOfPieces={200} // Number of confetti pieces to fall
                gravity={0.01} // Gravity effect on the confetti
                colors={["#f44336", "#00ff00", "#0000ff", "#ffff00", "#9c27b0"]} // Colors of the confetti
            />
        </>
        )}
    </div>
    );
};

export default Overlay;
