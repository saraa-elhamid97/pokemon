import React, { useEffect, useRef, useState } from 'react'
import Logo from './Logo';
import Modal from './Modal';
import './HomePage.css';




export default function HomePage() {

    const [pokemonUI, setPokemonUI] = useState([]);
    const [allPokemon, setAllPokemon] = useState([]);
    const [nextURL, setNextURL] = useState('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
    const [pokemonNum, setPokemonNum] = useState('');
    const shouldFetch = useRef(true);
    const search = useRef(null);
    const [openModal, setOpenModal] = useState(false);
    const [pokemonInfo, setPokemonInfo] = useState(null);

    async function fetchData() {
        const data = await fetch(nextURL).then(data => data.json());
        setNextURL(data.next);
        const pokemon_Name_Url = data.results;
        pokemon_Name_Url.forEach(async pokemonURL => {
            var pokemon = { "name": '', "img_url": '', "stats": [], "types": [] };
            const pokemon_data = await fetch(pokemonURL.url).then(pokemon_data => pokemon_data.json());
            pokemon.name = pokemon_data.name;
            pokemon.img_url = pokemon_data.sprites.front_default
            pokemon.stats = pokemon_data.stats;
            pokemon.types = pokemon_data.types;
            setPokemonUI(pokemonUI => [...pokemonUI, pokemon]);
            setAllPokemon(allPokemon => [...allPokemon, pokemon]);
        });
    }


    function searchedPokemons(event) {
        var tempPokemons = allPokemon.filter(pokemon => {
            return pokemon.name.toLowerCase().includes(search.current.value.toLowerCase());
        });
        setPokemonUI(tempPokemons);
        event.preventDefault();//stop refreshing the page
    }


    useEffect(() => {
        try {
            if (shouldFetch.current) {
                fetchData();
            }
            return () => {
                shouldFetch.current = false;
            }
        } catch (error) {
            console.log(error);
        }
    }, []);




    return (
        <div className='body'>
            <Logo />
            <div>
                <form>
                    <input type="text" ref={search} id="searchPokemon" name="searchPokemon" />
                    <button id="serach" onClick={searchedPokemons} >Serach</button>
                </form>
            </div>
            <div className="pokemonsContainer">
                {pokemonUI.map((e, key) =>
                    <button id="pokemonClick" onClick={() => {
                        setOpenModal(true);
                        setPokemonInfo(e);
                        setPokemonNum(key);
                    }}>
                        <div className="pokemonCard" key={key}>
                            <p className="pokemonNumber">#{(++key).toLocaleString('en-US', {
                                minimumIntegerDigits: 3,
                                useGrouping: false
                            })}</p>
                            <img id="imgHomePage" src={e.img_url} alt={e.name} />
                            <p className="pokemonName">{e.name}</p>
                        </div>
                    </button>
                )}
                {openModal && <Modal closeModal={setOpenModal} pokInfo={pokemonInfo} pokNum={pokemonNum} />}
            </div>
            <div><button id="loadMore" onClick={fetchData}>Load more...</button></div>
        </div >
    );
}