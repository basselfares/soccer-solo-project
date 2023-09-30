import React from "react";
import { useEffect, useState } from "react";
import PlayerSlot from "./components/PlayerSlot.jsx";



const slotIDs = ['GK', 'RB', 'RCB', 'LCB', 'LB', 'RCM', 'CM', 'LCM', 'RW', 'ST', 'LW'];

const emptySlots = slotIDs.map(position => ({slotId: position, playerData: null}))

export const TeamBuilder = () => {

  const [slots, setSlots] = useState(emptySlots)
  const [year, setYear] = useState(2023);
  const [allTeams, setAllTeams] = useState([]);
  const [loadedTeamId, setLoadedTeamId] = useState(null);
  const [teamNameInput, setTeamNameInput] = useState('');

  const populateAllTeams = async () => {
    const res = await fetch('http://localhost:3010/team/')
    const data = await res.json();
    setAllTeams(data);
  }

  const populateTeamData = async (teamId, teamName, slots) => {
    setLoadedTeamId(teamId);
    setTeamNameInput(teamName);
    setSlots(slots);
  }

  const loadTeam = async (teamId) => {
    const res = await fetch(`http://localhost:3010/team/${teamId}`)
    const data = await res.json();
    populateTeamData(data._id, data.teamName, data.slots);
  }

  const saveNewTeam = async () => {
    const body = {slots, teamName: teamNameInput}
    const res = await fetch(`http://localhost:3010/team/`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await res.json();
    populateTeamData(data._id, data.teamName, data.slots);
    populateAllTeams();
  }

  const saveExistingTeam = async () => {
    const body = {slots}
    const res = await fetch(`http://localhost:3010/team/${loadedTeamId}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await res.json();
    populateTeamData(data._id, data.teamName, data.slots);
  }

  const deleteExistingTeam = async () => {
    if (!loadedTeamId) return;
    const res = await fetch(`http://localhost:3010/team/${loadedTeamId}`, {
      method: 'DELETE',
    })
    const data = await res.json();
    resetToDefaults();
  }

  const resetToDefaults = () => {
    setSlots(emptySlots);
    setYear(2023)
    setLoadedTeamId(null);
    setTeamNameInput('');
    populateAllTeams();
  }

  const saveTeam = async (event) => {
    if (loadedTeamId) {
      saveExistingTeam();
    }
    else {
      saveNewTeam();
    }
  }

  useEffect(() => {
    populateAllTeams();
  }, [])

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
          <div>{allTeams.map(team => <button key={team._id} onClick={() => loadTeam(team._id)}>{team.teamName}</button>)}</div>
          <button onClick={deleteExistingTeam} hidden={!loadedTeamId}>Delete</button>
          <div>Team value: {teamMarketValue()}</div>
            <form action="">
                <select name="year" id="year" onChange={handleChange} value={year}>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                </select>
            </form>
            <form onSubmit={saveTeam}>
                <input type="text" value={teamNameInput} onChange={(e) => setTeamNameInput(e.target.value)} placeholder="Team Name" name='teamName' disabled={!!loadedTeamId}/>
                <button type="submit">Save</button>
            </form>
            <div className="formation">
              {slots.map(slot => <PlayerSlot key={slot.slotId} year={year} slotData={slot} selectPlayer={(player) => addPlayerToSlot(slot.slotId, player)}/>)}
            </div>
        </div>
    );
}




