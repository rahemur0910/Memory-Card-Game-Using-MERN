import React from "react"; 
// Importing the GameContextProvider, which provides the global game state to the entire app.
import GameContextProvider from "./context/GameContextProvider.jsx"; 

// Importing the main components for the game: GameBoard, SideBar, and Overlay.
import GameBoard from './components/GameBoard.jsx';
import SideBar from './components/SideBar.jsx';
import Overlay from './components/Overlay.jsx';

const App = () => {
  return (
    // Wrapping the entire application inside GameContextProvider to provide access to the game state across all child components.
    <GameContextProvider>
      {/* Main container for the app, taking full screen height and width */}
      <main className="relative overflow-hidden bg-app-banner bg-current bg-cover h-screen w-screen flex flex-col items-center justify-center">
        {/* Adding a green gradient overlay on top of the background */}
        <div className="absolute bg-gradient-to-r from-[#5ec73e] to-[#5ec808] opacity-50 w-full h-full" />
        
        {/* Game board container with specific size and background styles */}
        <div className="relative -mt-28 md:mt-10 md:-ms-72 lg:ms-0 bg-gameboard-background bg-center bg-contain bg-no-repeat w-[34rem] h-[34rem] md:w-[40rem] md:h-[40rem]">
          {/* Rendering the GameBoard component where the memory card game is displayed */}
          <GameBoard />
          {/* Rendering the SideBar component for additional game-related information */}
          <SideBar />
        </div>

        {/* Overlay component that appears when the game is over or won */}
        <Overlay />
      </main>
    </GameContextProvider>
  );
}

export default App;