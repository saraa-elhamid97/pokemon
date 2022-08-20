import React from 'react'
import './Modal.css';





const typeColors = {

    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
}


export default function Modal({ closeModal, pokInfo, pokNum }) {
    var total = 0;
    let firstPowerSubset = pokInfo.stats.slice(0, 3);
    let secondPowerSubset = pokInfo.stats.slice(3, 6);


    function sumStats() {
        pokInfo.stats.forEach(element => {
            total += element.base_stat;
        });
        return total;
    }

    return (
        <div className="modalBackground">
            <button id='close' onClick={() => { closeModal(false); }}>X</button>
            <div className="modalContainer">
                <div>
                    <p id="pokNumModal">#{pokNum.toLocaleString('en-US', {
                        minimumIntegerDigits: 3,
                        useGrouping: false
                    })}</p>
                    <img id="imgModal" src={pokInfo.img_url} alt={pokInfo.name} />
                    <p id="Name">{pokInfo.name}</p>
                    <div id="typeBtn">
                        {pokInfo.types.map((e, key) =>
                            <div><button style={{ background: typeColors[e.type.name] }} className='btn'>{e.type.name}</button></div>
                        )
                        }
                    </div>
                </div>
                <hr id='line' />

                <div className='pokemonDescription'>
                    <div className='description'>
                        <h2>Description</h2>
                        <p style={{ marginTop: -20 }}>A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.</p>
                    </div>
                    <h2>Stats</h2>
                    <div className='stats'>
                        <div>
                            {firstPowerSubset.map((e, key) =>
                                <p key={key}>{e.stat.name}: {e.base_stat}</p>
                            )}
                        </div>

                        <div>
                            {secondPowerSubset.map((e, key) =>
                                <p key={key} >{e.stat.name}: {e.base_stat}</p>
                            )}
                        </div>
                        <p>Total: {total = sumStats()}</p>
                    </div>
                </div>
            </div>
        </div >
    );
}
