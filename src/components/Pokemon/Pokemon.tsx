import React from "react";
import { Link, NavigateFunction } from "react-router-dom";
import { Pokemon } from "../../state/pokemons.slice";
import { Button } from "@mui/material";

export interface Props {
  loading: boolean;
  pokemon: Pokemon;
  navigate: NavigateFunction;
}

export const PokemonPage: React.FC<Props> = ({
  loading,
  pokemon,
  navigate,
}) => {
  return (
    <>
      {loading && <div>Loading...</div>}
      <div>
        {!loading &&
          (pokemon ? (
            <div>
              <div>
                <Button variant="contained">
                  <Link style={{textDecoration:'none',color:'white'}} to={"/"}>Back</Link>{" "}
                </Button>
              </div>
              <div>
                Name: <strong> {pokemon.name} </strong>
              </div>
              <div>Moves:</div>
              {pokemon.moves.length &&
                pokemon.moves.map((el: any, i: number) => {
                  return <>{el.move.name},</>;
                })}
              <div>Types:</div>
              {pokemon.types.length &&
                pokemon.types.map((el: any, i: number) => {
                  return (
                    <div
                      onClick={() => {
                        const splittedUrl = el.type.url.split("/");
                        navigate(
                          `/?type=${splittedUrl[splittedUrl.length - 2]}`
                        );
                      }}
                      key={i}
                    >
                      <strong style={{ cursor: "pointer" }}>
                        {el.type.name}
                      </strong>
                    </div>
                  );
                })}

              <img
                style={{ maxWidth: "500px", width: "100%" }}
                src={pokemon.sprites.other["official-artwork"]["front_default"]}
              />
            </div>
          ) : (
            "This pokemon does not exist"
          ))}
      </div>
    </>
  );
};
