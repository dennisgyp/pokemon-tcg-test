import Image from 'next/image'
import React, { useState, useEffect } from "react";
import { Poppins } from 'next/font/google'
import {getPokemonCards,searchPokemonCards,PokemonCard} from './api/pokemon'
import logo from "../assets/icons/Logo.svg"
import {ShoppingCartIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'



const poppins = Poppins({ 
subsets: ['latin'],
weight: ['400','500','600', '700'],
variable: '--font-poppins', })

// type FilterOptions = {
//   types: string[];
//   rarities: string[];
//   sets: string[];
// };

//Initial API test
// export default function Home() {
//   // let [responseData, setResponseData] = React.useState<pokemonCard>({})
//     // fetches data
//     // const fetchData = (e) => {
//     //     e.preventDefault()
//     //     api.getPokemonCards()
//     //     .then((response)=>{
//     //         setResponseData(response.data.data)
//     //         console.log(response.data.data)
//     //     })
//     //     .catch((error) => {
//     //         console.log(error)
//     //     })
//     // }

//     console.log(api)
    
   
 
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//      <div>
            
//             {/* <button onClick={(e) => api.getPokemsonCards} type='button'>Click Me For Data</button> 
//             {responseData.images && 
//           <img src={responseData.images.small} 
//         />
//         } */}
//         </div>
//     </main>
//   )
// }

const PokemonCardList = () => {
  const [pokemonCards, setPokemonCards] = useState<PokemonCard[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  //Unfinished code
  // const [filterOptions, setFilterOptions] = useState<FilterOptions>({
  //   types: [],
  //   rarities: [],
  //   sets: [],
  // });

  // useEffect(() => {
  //   const fetchPokemonCards = async () => {
  //     const data = await getPokemonCards(searchTerm);
  //     setPokemonCards(data);
     
  //   };
  //   fetchPokemonCards();
  // }, [searchTerm]);

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(event.target.value);
  // };
 
   //Unfinished Filters Query Function TODOO
  // const getFilterOptions = (cards: PokemonCard[]): FilterOptions => {
  //   const types = Array.from(new Set(cards.flatMap((card) => card.types)));
  //   const rarities = Array.from(new Set(cards.map((card) => card.rarity)));
  //   const sets = Array.from(new Set(cards.map((card) => card.set)));

  //   return { types, rarities, sets };
  // };

  //On Mount React function for initial request
  useEffect(() => {
    const getRandomCards = async () => {
      const data = await getPokemonCards();
      setPokemonCards(data);
    };

    getRandomCards();
  }, []);

//Query Function use to call API
  const handleSearchSubmit = async () => {
    setSearchLoading(true);
    const data = await searchPokemonCards(searchTerm);
    setPokemonCards(data);
    console.log(data)
    setSearchLoading(false);
  };

  //Function to set value to be searched
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  
  //Unfinished filter function TODOO
  // const handleFilterChange = async (event: React.ChangeEvent<HTMLSelectElement>, filterKey: keyof FilterOptions) => {
  //   const newFilterOptions = { ...filterOptions, [filterKey]: [event.target.value] };
  //   setFilterOptions(newFilterOptions);
  //   setSearchLoading(true);
  //   const data = await searchPokemonCards(searchTerm, newFilterOptions);
  //   setPokemonCards(data);
  //   setSearchLoading(false);
  // };

  

  const handleButtonClick = (id:any) => {
    setActiveButton(activeButton === id ? null : id);
  };

  // function classNames(...classes) {
  //   return classes.filter(Boolean).join(' ')
  // }

 

  return (
    <main className={`${poppins.variable} font-sans flex min-h-screen flex-col items-center justify-between bg-[#F8F8F8]`}>
       <div className="fixed shadow-slate-300 w-full bg-white h-[77px] z-[1000] left-0 top-0 after:absolute after:w-[47px] after:bg-white after:h-[47px] after:z-[1] after:bottom-[-22px] after:ml-[-23px]  after:rounded-[25px] after:left-1/2 ">
          <div className="flex flex-col mt-3 items-center">
            <h1 className="font-bold text-black text-2xl  ">TCG Marketplace </h1>
            <div className="fixed top-12 z-20">
              <a href="#">
                <span className="sr-only">TCG Marketplace</span>
                <Image
                  className="w-auto"
                  src={logo}
                  alt="Pokemon Logo"
                />
              </a>
            </div>
          </div>
        </div>
      
    <div className="mt-32 mb-10">
      <div className="flex flex-col mb-8 justify-between sm:flex-row gap-4 sm:gap-2">
          <div className="mt-1 flex flex-col sm:flex-row lg:shadow-sm ">
            <div className="relative flex  flex-grow items-stretch focus-within:z-10">
              <input
                type="text"
                placeholder="Name..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="block w-full  text-center lg:text-left h-[35px] lg:rounded-l-[100px] mb-4 lg:mb-0 rounded-full lg:rounded-none text-[#BCBBBB] text-[14px]  border-gray-300 pl-5 sm:text-sm" 
              />
            </div>
            <div className="flex lg:gap-0 gap-3 justify-between ">
              <label className="sr-only">
                Type
              </label>
              <select
                id="type"
                name="type"
                className=" h-[35px] text-center  border border-l-gray-300 lg:border-y-0  rounded-full lg:rounded-none  py-0 pl-3 pr-3 text-[11px]  text-[#BCBBBB] sm:text-sm"
              >
              <option  disabled selected  hidden>Type</option>
              <option>Grass</option>
              
              </select>
           
              <label  className="sr-only">
                Rarity
              </label>
              <select
                id="Rarity"
                name="Rarity"
                className=" w-24 border text-center truncate h-[35px] lg:border-y-0 border-l-gray-300 rounded-full lg:rounded-none py-0 pl-3 text-[11px]  pr-3 text-[#BCBBBB] sm:text-sm"
              >
                <option  disabled defaultValue="Rarity" selected hidden>Rarity</option>
                <option >Legendary</option>
                
              </select>
              <label className="sr-only">
                Set
              </label>
              <select
                id="set"
                name="set"
                className=" h-[35px] text-center lg:rounded-r-[100px] lg:border-y-0 rounded-full lg:rounded-none  truncate border border-l-gray-300 text-[11px] py-0 pl-3 pr-3  text-[#BCBBBB] sm:text-sm"
              >
                <option  disabled selected defaultValue="set" hidden>Set</option>
                <option>Emerald</option>
              </select>
              </div>
          </div>

            <button
              onClick={handleSearchSubmit}
              disabled={searchLoading}
              className="bg-blue-500 mt-1 w-auto h-[35px] text-white px-4 rounded-[100px]"
            >
              {searchLoading ? 'Loading...' : 'Search'}
            </button>
      </div>
    </div>
     
    <div className="grid grid-cols-1  sm:grid-cols-3 md:grid-cols-3 lg:gap-24 gap-20">
      {pokemonCards.map((card) => (
        <div className="bg-transparent h-[431px] relative px-12">
          <img className="h-[267px] relative z-20  w-auto" key={card.id} src={card.images.small} alt={card.name} />
          
          <div className="absolute rounded-3xl left-0 z-10 w-full h-[204px] bottom-[20px] shadow-sm bg-white ">
            <div className="flex flex-col mt-[70px] items-center">
              <h1 className="text-[25px] text-black font-bold">{card.name} </h1>
              <h2 className="text-[16px] text-[#0F6DB0] font-regular">{card.rarity} </h2>
              <div className="flex gap-4 text-[20px]">
                  <p className="text-gray-300 ">${card.cardmarket.prices.averageSellPrice}</p>
                  <p className="text-gray-300">{card.set.total} left</p>
              </div>
            </div>
          
          </div>
          <div className="absolute z-20 left-[40px] bottom-0  rounded-3xl ">
            <button key={card.id} onClick={()=>handleButtonClick(card.id)} className={`map-button shadow-md mt-1 font-medium text-[20px] w-[217px] h-[47px] px-4  rounded-[100px] ${activeButton === card.id ? 'bg-black' : 'bg-[#FDCE29]  text-black '}`}> {activeButton === card.id ? 'Selected' : 'Select card'}</button>
          </div>
        </div>
      ))}
      
    </div>
    {/* TODO Showmore Function */}
    <div className="flex items-center justify-between gap-2 mt-10 mb-10">
    <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
      <a href="#" className="font-medium text-[16px] text-[#6A6969] hzover:underline">Show more</a>
    </div>
    {/* TODO Cart Function */}
    <button className="fixed flex z-[500] bottom-[60px] font-medium text-[12px]  items-center pl-1  bg-blue-500 w-[102px] h-[35px] text-white  rounded-xl">
        <ShoppingCartIcon className="h-5 w-5 pl-1 mr-2"></ShoppingCartIcon>
       View Cart
    </button>

    
  </main>
  );
};

export default PokemonCardList;
