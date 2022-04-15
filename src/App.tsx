import React, { useState, useEffect } from "react";
import { json } from "stream/consumers";
import PokeApi from "./api";
import "./App.css";

function App() {
  const [apivalue, setApivalue] = useState<any>();
  const [imgPokemon, setImgPokemon] = useState<any>("");
  const [namePokemon, setnamePokemon] = useState("");
  const [stylevar, setStylevar] = useState("0");
  const [guessInput, setGuessInput] = useState("");
  const [correctCounter, setCorrectCounter] = useState(0);
  const [guessOk, setGuessOk] = useState(false);
  const [pokename, setPokename] = useState<any>("");
  const [showResult, setShowResult] = useState(false);
  const [errorCounter, setErrorCounter] = useState(0);
  const [attempts, setAttempts] = useState<any>(
    JSON.parse(localStorage.getItem("pokeguesser") || "")
  );

  const guessAttempt = () => {
    setGuessInput(guessInput.toLowerCase().trim());
    setShowResult(true);
    console.log(correctCounter);
    console.log(errorCounter);
    console.log(attempts);
    if (guessInput === namePokemon) {
      setStylevar("1");
      setGuessOk(true);
      setAttempts((attempts[aciertos] += 1));
    } else {
      setErrorCounter(errorCounter + 1);
    }
    console.log(correctCounter);
    // setAttempts({ aciertos: correctCounter + 1, errores: errorCounter });
    console.log(attempts);
    save();
  };

  const save = () => {
    localStorage.setItem("pokeguesser", JSON.stringify(attempts));
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    const res = await PokeApi.random();
    setnamePokemon(res.name);
    setImgPokemon(res.image);
  };

  const handleChange = (e: any) => {
    setGuessInput(e.target.value);
  };

  const playAgain = () => {
    setShowResult(false);
    setStylevar("0");
    fetchPokemon();
    setGuessInput("");
    setGuessOk(false);
  };

  return (
    <div>
      <input
        placeholder="ingresa aqui pokemon"
        type="text"
        value={guessInput}
        onChange={handleChange}
      />
      <button onClick={guessAttempt}>Adivinar</button>
      <img
        src={imgPokemon}
        alt="poke"
        style={{ filter: `brightness(${stylevar})` }}
      />
      {showResult && (
        <div>
          {guessOk ? <p>adivinaste!</p> : <p>no es correcto....</p>}
          <button onClick={playAgain}>Jugar de nuevo</button>
        </div>
      )}
      <p>aciertos:{attempts.aciertos}</p>
      <p>errores:{attempts.errores}</p>
    </div>
  );
}

export default App;
