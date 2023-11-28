import "../../App.css";
import React from "react";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { Pokemon } from "../../state/pokemons.slice";
import { NavigateFunction } from "react-router-dom";
import { URLSearchParams } from "url";

export interface Props {
  timeoutId: any;
  findPokemon: (name: string) => Promise<void>;
  searchParams: URLSearchParams;
  currentType: string;
  handleChange: (event: SelectChangeEvent) => void;
  types: string[];
  openSelectSnack: boolean;
  loading: boolean;
  pokemons: Pokemon[];
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  hasMore: boolean;
  navigate: NavigateFunction;
}

function Pokemons({
  timeoutId,
  findPokemon,
  searchParams,
  currentType,
  handleChange,
  types,
  openSelectSnack,
  loading,
  pokemons,
  setOffset,
  hasMore,
  navigate,
}: Props) {

  return (
    <div className="pokemon-list">
      <div className="pokemon-list__search">
        <TextField
          type="text"
          label="Find pokemon"
          variant="outlined"
          onChange={(e) => {
            if (timeoutId.current) {
              clearTimeout(timeoutId.current);
            }

            timeoutId.current = setTimeout(() => {
              findPokemon(e.target.value);
            }, 2000);
          }}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <Select
            value={searchParams.get("type") || currentType}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            {types.map((el:string, i:number) => {
              return <MenuItem key={i} value={el}>{el}</MenuItem>;
            })}
          </Select>
          <FormHelperText>Type</FormHelperText>
        </FormControl>
        <Snackbar
          open={openSelectSnack}
          autoHideDuration={1000}
          message="This pokemon does not exist"
        />
      </div>
      {loading && <h4>Loading...</h4>}
      <InfiniteScroll
        dataLength={pokemons.length}
        next={() => setOffset((prev: number) => prev + 10)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        className="scroll-container"
      >
        {pokemons.length > 0 &&
          pokemons.map((el: Pokemon, i: number) => (
            <div
              onClick={() => {
                navigate(`/pokemon/${el.name}`);
              }}
              key={i}
              className="pokemon-card"
            >
              <div className="pokemon-card__image">
                <img src={el.img} alt="" />
              </div>
              <div>{el.name}</div>
            </div>
          ))}
      </InfiniteScroll>
    </div>
  );
}

export default Pokemons;
