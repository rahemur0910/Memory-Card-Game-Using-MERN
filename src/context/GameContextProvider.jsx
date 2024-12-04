import React, { createContext, useEffect, useRef, useState } from "react";

// Import fruit images
import apple from "../assets/images/fruits/apple.png";
import dragonfruit from "../assets/images/fruits/dragonfruit.png";
import durian from "../assets/images/fruits/durian.png";
import mangosteen from "../assets/images/fruits/mangosteen.png";
import passionfruit from "../assets/images/fruits/passionfruit.png";
import pineapple from "../assets/images/fruits/pineapple.png";
import starfruit from "../assets/images/fruits/starfruit.png";
import watermelon from "../assets/images/fruits/watermelon.png";

// Create a context to share game-related data across components
export const GameContext = createContext();

const GameContextProvider = ({ children }) => {
  // State to manage the deck of cards
  const [cards, setCards] = useState([]);
  // State to keep track of the indices of currently flipped cards
  const [flippedCards, setFlippedCards] = useState([]);
  // State to store matched card pairs
  const [matchedPairs, setMatchedPairs] = useState([]);
  // State to show all icons initially for a brief period
  const [showIcons, setShowIcons] = useState(true);
  // State to manage the countdown timer (changed to 60 seconds)
  const [timeLeft, setTimeLeft] = useState(60);
  // State to indicate whether the game is over
  const [gameOver, setGameOver] = useState(false);
  // State to indicate whether the game is won
  const [gameWon, setGameWon] = useState(false);
  // State to store the player's score
  const [score, setScore] = useState(0);
  // useRef to keep track of the timer interval
  const timerRef = useRef(null);

  // useEffect hook to initialize the game state and start the timer
  useEffect(() => {
    // Array of fruit icons to be used as card images
    const fruitIcons = [
      apple,
      dragonfruit,
      durian,
      mangosteen,
      passionfruit,
      pineapple,
      starfruit,
      watermelon,
    ];

    // Create pairs of each fruit and shuffle them randomly
    const pairIcons = [...fruitIcons, ...fruitIcons];
    const shuffledIcons = pairIcons.sort(() => Math.random() - 0.5);

    // Create an array of card objects with unique IDs
    const cardItems = shuffledIcons.map((fruit, index) => ({
      id: index, // Unique identifier for each card
      fruit, // The fruit image associated with the card
      flipped: false, // Whether the card is currently flipped
    }));

    // Set the shuffled cards in the state
    setCards(cardItems);

    // Show all card icons initially for 3 seconds
    setTimeout(() => {
      setShowIcons(false); // Hide the icons after 3 seconds
    }, 3000);

    // Start the countdown timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current); // Stop the timer when time is up
          if (!gameWon) setGameOver(true); // Mark the game as over if not won
          return 0;
        }
        return prev - 1; // Decrease the time left by 1 second
      });
    }, 1000);

    // Clean up the timer when the component unmounts
    return () => clearInterval(timerRef.current);
  }, [gameWon]);

  // Function to handle card flips
  const flipCard = (index) => {
    // Prevent flipping more than two cards at once
    if (flippedCards.length === 2) return;

    // Create a copy of the cards array and flip the selected card
    const updatedCards = [...cards];
    updatedCards[index].flipped = true; // Mark the card as flipped
    setCards(updatedCards); // Update the state with the flipped card

    // Update the flippedCards state with the new card's index
    setFlippedCards((prevFlippedCards) => {
      const newFlippedCards = [...prevFlippedCards, index];

      // If two cards are flipped, check if they match
      if (newFlippedCards.length === 2) {
        const [firstIndex, secondIndex] = newFlippedCards;

        // Check if the fruits of the two flipped cards match
        if (
          updatedCards[firstIndex].fruit === updatedCards[secondIndex].fruit
        ) {
          // If they match, add the fruit to the matchedPairs array
          const newMatchedPairs = [
            ...matchedPairs,
            updatedCards[firstIndex].fruit,
          ];
          setMatchedPairs(newMatchedPairs); // Update the matched pairs

          // Check if all pairs are matched (win condition)
          if (newMatchedPairs.length === cards.length / 2) {
            clearInterval(timerRef.current); // Stop the timer
            setTimeout(() => setGameWon(true), 1000); // Mark the game as won after a delay
            setScore(timeLeft * 10); // Calculate and set the score based on remaining time
          }
        } else {
          // If the cards do not match, flip them back after a 1-second delay
          setTimeout(() => {
            const resetCards = [...updatedCards];
            resetCards[firstIndex].flipped = false; // Flip the first card back
            resetCards[secondIndex].flipped = false; // Flip the second card back
            setCards(resetCards); // Update the cards state
          }, 1000);
        }

        return []; // Reset flippedCards state after checking
      }

      return newFlippedCards; // Return the updated flipped cards array
    });
  };

  // Function to restart the game
  const restartGame = () => {
    window.location.reload(); // Reload the page to restart the game
  };

  return (
    <GameContext.Provider
      value={{
        cards,
        flipCard,
        matchedPairs,
        showIcons,
        timeLeft,
        gameOver,
        gameWon,
        restartGame,
        score,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
