import axios from "axios";

export class PokemonsApi {
  static async getPokemonByName(name: string) {
    return await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

  static async getPokemonsByType(pokemonId: string) {
    return await axios.get(`https://pokeapi.co/api/v2/type/${pokemonId}`);
  }

  static async getPokemons(limit: number, offset: number) {
    return await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
  }
}
