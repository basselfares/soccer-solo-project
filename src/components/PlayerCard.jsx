import { set } from "mongoose";
import React from "react";
import { useEffect, useState } from "react";

const PlayerCard = (props) => {

    const playerData = props.player;

    let displayableMarketValue = getMarketValueYear(playerData.timephasedMarketValue)

    function getMarketValueYear (timephasedMV) {
        for (let i = 0; i < timephasedMV.length; i++) {
            console.log(props.year)
            if (timephasedMV[i].unformattedDate.slice(0, 4) == props.year) {
                
                return timephasedMV[i].marketValueUnformatted.toLocaleString();
            }
        }
    }

return (

    <div className="playerBox">
        <div className="playerBoxLeft"><img src={playerData.playerImage} alt="player-picture"/></div>
        <div className="playerBoxRight">
        <div>{playerData.playerFullName}</div>
        <div>{playerData.dateOfBirth}</div>
        <div className="logoContainer">
            <div><img src={playerData.birthplaceCountryImage} alt="player-nationality" className="logo"/></div>
            <div><img src={playerData.clubImage} alt="player-club" className="logo"/></div>
        </div>
        <div>${displayableMarketValue}</div>
        </div>
    </div>
)
}

export default PlayerCard;