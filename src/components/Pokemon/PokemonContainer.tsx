import React, { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/state";
import { setPokemon } from "../../state/pokemons.slice";
import { PokemonPage } from "./Pokemon";

export const PokemonContainer = () => {
  let { name } = useParams();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const pokemon = useSelector(
    (state: RootState) => state.pokemons.currentPokemon
  );
  const dispatch = useDispatch();

  async function getPokemon(name: string) {
    try {
      const pokemonApi = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      dispatch(setPokemon(pokemonApi.data || null));
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPokemon(name!);
  }, []);

  return (
    <PokemonPage loading={loading} navigate={navigate} pokemon={pokemon!} />
  );
};
