import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  pokemons: Pokemon[];
  currentPokemon: Pokemon | null;
}

export interface Pokemon {
  img?: string;
  name: string;
  types: { type: { name: string; url: string } }[];
  moves: { move: { name: string } }[];
  sprites: {
    other: {
      ["official-artwork"]: {
        front_default: string;
      };
    };
  };
}

const state: State = {
  pokemons: [],
  currentPokemon: null,
};

const slice = createSlice({
  name: "pokemons",
  initialState: state,
  reducers: {
    setPokemons: (state, action: PayloadAction<Pokemon[]>) => {
      state.pokemons = action.payload;
    },
    setPokemon: (state, action: PayloadAction<Pokemon>) => {
      state.currentPokemon = action.payload;
    },
  },
});

export const { reducer } = slice;
export const { setPokemons, setPokemon } = slice.actions;
