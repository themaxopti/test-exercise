import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PokemonsContainer } from "./components/Pokemons/PokemonsContainer";
import { PokemonContainer } from "./components/Pokemon/PokemonContainer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={PokemonsContainer} />
        <Route path="/pokemon/:name" Component={PokemonContainer} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
