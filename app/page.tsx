"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Player {
  name: string;
  position: string;
  school: string;
  year: string;
  twitter: string;
  board: string;
  contacted: boolean;
}

export default function Page() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [boards, setBoards] = useState<string[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [search, setSearch] = useState("");
  const [newPlayer, setNewPlayer] = useState({ name: "", position: "", school: "", year: "", twitter: "" });

  // Load players and boards from localStorage on mount
  useEffect(() => {
    const savedPlayers = localStorage.getItem("players");
    if (savedPlayers) setPlayers(JSON.parse(savedPlayers));

    const savedBoards = localStorage.getItem("boards");
    if (savedBoards) setBoards(JSON.parse(savedBoards));
  }, []);

  // Add a new player
  const addPlayer = () => {
    if (!newPlayer.name) return;
    const updatedPlayers = [...players, { ...newPlayer, board: "", contacted: false }];
    setPlayers(updatedPlayers);
    localStorage.setItem("players", JSON.stringify(updatedPlayers));
    setNewPlayer({ name: "", position: "", school: "", year: "", twitter: "" });
  };

  // Function to move player to a board
  const movePlayerToBoard = (player: Player, board: string) => {
    if (!player || !board) return;
    const updatedPlayers = players.map(p => p === player ? { ...p, board } : p);
    setPlayers(updatedPlayers);
    localStorage.setItem("players", JSON.stringify(updatedPlayers));
    if (selectedPlayer === player) {
      setSelectedPlayer({ ...player, board });
    }
  };

  // Search filtered players
  const filteredPlayers = players.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ fontSize: "28px", color: "#3b82f6", marginBottom: "20px" }}>WAR ROOM</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Players..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "20px", background: "#111", color: "#fff", border: "1px solid #333" }}
      />

      {/* Add New Player Form */}
      <div style={{ marginBottom: "30px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <input type="text" placeholder="Name" value={newPlayer.name} onChange={e => setNewPlayer({ ...newPlayer, name: e.target.value })} />
        <input type="text" placeholder="Position" value={newPlayer.position} onChange={e => setNewPlayer({ ...newPlayer, position: e.target.value })} />
        <input type="text" placeholder="School" value={newPlayer.school} onChange={e => setNewPlayer({ ...newPlayer, school: e.target.value })} />
        <input type="text" placeholder="Year" value={newPlayer.year} onChange={e => setNewPlayer({ ...newPlayer, year: e.target.value })} />
        <input type="text" placeholder="Twitter" value={newPlayer.twitter} onChange={e => setNewPlayer({ ...newPlayer, twitter: e.target.value })} />
        <button onClick={addPlayer} style={{ padding: "10px", background: "#3b82f6", color: "#fff", border: "none", cursor: "pointer" }}>Add Player</button>
      </div>

      {/* Player List */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {filteredPlayers.map((player, idx) => (
          <motion.div key={idx} layout style={{ background: "#111", padding: "15px", border: "1px solid #333", cursor: "pointer" }} onClick={() => setSelectedPlayer(player)}>
            <p style={{ fontWeight: "bold" }}>{player.name}</p>
            <p>{player.position} - {player.school}</p>
            <p>Class {player.year}</p>
          </motion.div>
        ))}
      </div>

      {/* Selected Player Panel */}
      {selectedPlayer && (
        <div style={{ marginTop: "30px", padding: "20px", border: "1px solid #3b82f6", background: "#111" }}>
          <h2>{selectedPlayer.name}</h2>
          <p>{selectedPlayer.position} - {selectedPlayer.school}</p>
          <p>Class: {selectedPlayer.year}</p>
          <p>Board: {selectedPlayer.board || "None"}</p>
          <p>Contacted: {selectedPlayer.contacted ? "Yes" : "No"}</p>
          <button onClick={() => window.open(selectedPlayer.twitter)} style={{ padding: "8px 12px", background: "#3b82f6", color: "#fff", border: "none", cursor: "pointer", marginTop: "10px" }}>Open Twitter</button>

          {/* Add to Board Dropdown + Button */}
          <div style={{ marginTop: "15px" }}>
            <select value={selectedPlayer.board || ""} onChange={(e) => movePlayerToBoard(selectedPlayer, e.target.value)} style={{ width: "100%", padding: "10px", background: "#111", color: "#fff", border: "1px solid #333" }}>
              <option value="" disabled>Select Board</option>
              {boards.map(board => (
                <option key={board} value={board}>{board}</option>
              ))}
            </select>

            <button onClick={() => movePlayerToBoard(selectedPlayer, selectedPlayer.board || boards[0] || "")} style={{ width: "100%", marginTop: "10px", padding: "10px", background: "#3b82f6", color: "#fff", border: "none", cursor: "pointer" }}>Add to Board</button>
          </div>
        </div>
      )}
    </div>
  );
}
