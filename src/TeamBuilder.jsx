import React from "react";
import { useEffect, useState } from "react";
import PlayerSlot from "./components/PlayerSlot.jsx";



const slotIDs = ['GK', 'RB', 'RCB', 'LCB', 'LB', 'RCM', 'CM', 'LCM', 'RW', 'ST', 'LW'];

const emptySlots = slotIDs.map(position => ({slotId: position, playerData: null}))

export const TeamBuilder = () => {

  const [slots, setSlots] = useState(emptySlots)
  const [year, setYear] = useState(2023);


  const addPlayerToSlot = (slotId, playerData) => {
    const slotsCopy = [...slots];

    const slotToUpdate = slotsCopy.find(s => s.slotId === slotId);

    slotToUpdate.playerData = playerData;

    console.log(JSON.stringify(slotsCopy))
    setSlots(slotsCopy);
  }

  const handleChange = (event) => {
    const value = event.target.value;
    setYear(value)
  }

  const teamMarketValue = () => {
    let sum = 0;
    for (let i = 0; i < slots.length; i++) {
      const player = slots[i].playerData;
      if (player){
        for (let j = 0; j < player.timephasedMarketValue.length; j++) {
          if (player.timephasedMarketValue[j].unformattedDate.slice(0, 4) == year) {
            sum += player.timephasedMarketValue[j].marketValueUnformatted;
            j = player.timephasedMarketValue.length;
          }
        }
      }
    }
    return sum.toLocaleString();
  }

    return (
        <div>
          <div>Team value: {teamMarketValue()}</div>
            <form action="">
                <select name="year" id="year" onChange={handleChange} value={year}>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                </select>
            </form>
            <form action="">
                <input type="text" placeholder="Team Name" />
                <button>Save</button>
            </form>
            <div className="formation">
              {slots.map(slot => <PlayerSlot key={slot.slotId} year={year} slotData={slot} selectPlayer={(player) => addPlayerToSlot(slot.slotId, player)}/>)}
            </div>
        </div>
    );
}




