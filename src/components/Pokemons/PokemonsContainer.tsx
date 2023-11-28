import "../../App.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/state";
import { setPokemons } from "../../state/pokemons.slice";
import Pokemons from "./Pokemons";
import { PokemonsApi } from "../../api/api";

export const PokemonsContainer = () => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const pokemons = useSelector((state: RootState) => state.pokemons.pokemons);
  const dispatch = useDispatch();

  const [types, setTypes] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
  ]);
  const [currentType, setCurrentType] = useState("1");

  const navigate = useNavigate();
  const [openSelectSnack, setOpenSelectSnack] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const timeoutId = useRef();

  const handleChange = useCallback((event: SelectChangeEvent) => {
    setLoading(true);
    setCurrentType(event.target.value);
    setSearchParams({ type: event.target.value });
  }, []);

  const findPokemon = useCallback(async (name: string) => {
    try {
      if (name === "") {
        return;
      }

      const pokemonApi = await PokemonsApi.getPokemonByName(name);

      if (pokemonApi.data) {
        navigate(`/pokemon/${pokemonApi.data.name}`);
      }
    } catch (e) {
      setOpenSelectSnack(true);
      setTimeout(() => {
        setOpenSelectSnack(false);
      }, 5000);
    }
  }, []);

  const getPokemons = async (limit: number, offset: number) => {
    let pokemonsApi: any;
    if (searchParams.get("type")) {
      const pokemonId = searchParams.get("type");

      const pokemonsByType = await PokemonsApi.getPokemonsByType(pokemonId!);
      pokemonsApi = {};
      pokemonsApi.data = {};
      pokemonsApi.data.results = pokemonsByType.data.pokemon.map((el: any) => {
        return {
          name: el.pokemon.name,
          url: el.pokemon.url,
        };
      });
    } else {
      pokemonsApi = await PokemonsApi.getPokemons(limit, offset);
    }

    const tempPokemons: { name: string; img: string }[] = [];
    if (pokemonsApi.data.results.length === 0) {
      setHasMore(false);
    } else {
      for (let i = 0; i < pokemonsApi.data.results.length; i++) {
        const pokemon = pokemonsApi.data.results[i];
        const pokemonInfo = await PokemonsApi.getPokemonByName(pokemon.name);

        tempPokemons.push({
          name: pokemon.name,
          img: pokemonInfo.data.sprites.other["official-artwork"][
            "front_default"
          ],
        });
      }
      if (searchParams.get("type")) {
        setHasMore(false);
      }
      setLoading(false);
    }

    if (searchParams.get("type")) {
      dispatch(setPokemons(tempPokemons as any));
    } else {
      dispatch(setPokemons([...pokemons, ...tempPokemons] as any));
    }
  };

  useEffect(() => {
    if (offset === 0) {
      return;
    }
    getPokemons(limit, offset);
  }, [offset]);

  useEffect(() => {
    getPokemons(limit, offset);
  }, []);

  useEffect(() => {
    if (searchParams.get("type")) {
      dispatch(setPokemons([]));
      getPokemons(limit, offset);
    }
  }, [searchParams]);

  return (
    <Pokemons
      currentType={currentType}
      findPokemon={findPokemon}
      handleChange={handleChange}
      hasMore={hasMore}
      loading={loading}
      navigate={navigate}
      openSelectSnack={openSelectSnack}
      pokemons={pokemons}
      searchParams={searchParams}
      setOffset={setOffset}
      timeoutId={timeoutId}
      types={types}
    />
  );
};
