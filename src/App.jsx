import React from "react";

export const App = () => {
    return (
        <div>
            <h1>TeamBuilder</h1>
            <form action="">
                <input type="text" placeholder="Lionel Messi" />
                <button>Search</button>
            </form>
            <div className="playerBox">
                <div><img src="https://img.a.transfermarkt.technology/portrait/medium/74842-1612898267.jpg?lm=1" alt="player-picture"/></div>
                <div>Lionel Messi</div>
                <div>1/1/2000</div>
                <div><img src="https://tmssl.akamaized.net/images/flagge/verysmall/40.png?lm=1520612525" alt="player-nationality" className="logo"/></div>
                <div><img src="https://tmssl.akamaized.net/images/wappen/medium/383.png?lm=1626929299" alt="player-club" className="logo"/></div>
                <div>$180.00m</div>
            </div>
        </div>
    );
}