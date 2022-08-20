import React from 'react'
import pokedex from './pokedex.jpg'
import './Logo.css';


export default function Logo() {
    return (
        <div>
            <img id="pokedexImg" src={pokedex} alt="pokedex" />
        </div>
    )
}
