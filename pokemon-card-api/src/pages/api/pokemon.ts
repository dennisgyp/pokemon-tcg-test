import axios, { AxiosResponse } from 'axios';

export interface PokemonCard {
  id: string;
  name: string;
  cardmarket:{
    prices:{
      averageSellPrice:string;
    }
  }
  set:{
      total:string;
  }
  types:string;
  rarity:string;
  images:{
    small:string;
  };
  // Add any other relevant properties here
}

const POKE_API_URL = 'https://api.pokemontcg.io/v2/cards';

//API GET Quest for initial 12 cards when component first mount
export const getPokemonCards = async (): Promise<PokemonCard[]> => {
  try {
    const response: AxiosResponse<{ data: PokemonCard[] }> = await 
        axios({
            'method':'GET',
            'url':'https://api.pokemontcg.io/v2/cards',
            'headers': {
                'content-type':'application/json',
                'api-key': process.env.API_KEY
            },
            'params': {
                
                'pageSize':'12',
                
            },
        })
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

//Query Get Request for requested cards
export const searchPokemonCards = async (query?: string,filterOptions?: string): Promise<PokemonCard[]> => {
  try {
    const response: AxiosResponse<{ data: PokemonCard[] }> = await 
        axios({
            'method':'GET',
            'url':'https://api.pokemontcg.io/v2/cards',
            'headers': {
                'content-type':'application/json',
                'api-key': process.env.API_KEY
            },
            'params': {
                'q':`name:${query}`,
                'pageSize':'12',
                
            },
        })
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};


