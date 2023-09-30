import React from "react";
import { useEffect, useState } from "react";

const PlayerSlotSearch = props => {
    const [inputs, setInputs] = useState({});
    const [results, setResults] = useState([]);
  
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(value)
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log('asdads', inputs);
  
      fetch('http://localhost:3010/api/search', {
      method: 'POST',
      body: JSON.stringify({ playerSearch: inputs}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the backend, if needed
        console.log(data)
        setResults(data)
        console.log('Response from backend:', inputs.name);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }

    const handlePlayerSelection = (playerId) => {
        props.selectPlayerId(playerId);
      }

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>Name: <input className="playerSearchInput" type="text" name="name" defaultValue={inputs.name || ""} onChange={handleChange} /></label>
          <input className="playerSearchSubmit" type="submit" value="Submit" />
        </form>
        <div>
          {results.map(result => <button key={result.id} onClick={() => handlePlayerSelection(result.id)}>{result.playerName}</button>)}
        </div>
      </div>
    )
  }
  
  export default PlayerSlotSearch;