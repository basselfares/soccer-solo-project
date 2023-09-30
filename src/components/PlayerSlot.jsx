import React from "react";
import { useEffect, useState } from "react";
import PlayerCard from "./PlayerCard.jsx";
import PlayerSlotSearch from './PlayerSlotSearch.jsx';

const PlayerSlot = (props) => {
    
    const [searchVisible, setSearchVisible] = useState(false);

    const selectPlayerId = async (playerId) => {
        // call playerProfileApi with playerId
        try {
            const response = await fetch(`http://localhost:3010/api/player/${playerId}`);
            console.log(response)
            const result = await response.json();
            console.log(result)
            props.selectPlayer(result)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        // take playerData and use as argument in props.onSelectPlayer call

        // Hide search component
        setSearchVisible(false);
    }

    return (
        <div className="playerSlot">
            {searchVisible ? <PlayerSlotSearch selectPlayerId={selectPlayerId} />: null}
            {props.slotData.playerData ? <PlayerCard  year={props.year} player={props.slotData.playerData}/> :
            <button hidden={searchVisible} onClick={() => setSearchVisible(true)}>+</button>}
        </div>
    )
}

export default PlayerSlot;