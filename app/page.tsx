"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Player {
  name: string;
  position: string;
  school: string;
  year: string;
  twitter: string;
  board: string;
  contacted: boolean;
}

const defaultBoards = ["All Players", "Offer Soon", "Contacted"];

export default function Page() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [search, setSearch] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [newPlayer, setNewPlayer] = useState({ name: "", position: "", school: "", year: "", twitter: "" });
  const [boards, setBoards] = useState<string[]>([]);
    const movePlayerToBoard = (player: Player, board: string) => {
    // update the player in the players array
    const updatedPlayers = players.map(p => p === player ? { ...p, board } : p);
    setPlayers(updatedPlayers);

    // save updated players to localStorage
    localStorage.setItem("players", JSON.stringify(updatedPlayers));

    // if this is the currently selected player, update it too
    if (selectedPlayer === player) {
      setSelectedPlayer({ ...player, board });
    }
  };

useEffect(() => {
  const savedBoards = localStorage.getItem("boards");
  if (savedBoards) setBoards(JSON.parse(savedBoards));
}, []);

  // Load from localStorage
  useEffect(() => {
    const savedPlayers = localStorage.getItem("players");
    if (savedPlayers) setPlayers(JSON.parse(savedPlayers));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  const filteredPlayers = players.filter(p =>
    `${p.name} ${p.position} ${p.school} ${p.year}`.toLowerCase().includes(search.toLowerCase())
  );

  const addPlayer = () => {
    if (!newPlayer.name) return;
    setPlayers([...players, { ...newPlayer, board: "All Players", contacted: false }]);
    setNewPlayer({ name: "", position: "", school: "", year: "", twitter: "" });
  };

    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ fontSize: "28px", color: "#3b82f6", marginBottom: "20px" }}>THE WAR ROOM</h1>

      {/* Navigation */}
      <Link href="/boards">
        <button style={{ padding: "10px 15px", marginBottom: "20px", background: "#3b82f6", color: "#fff", border: "none", cursor: "pointer" }}>Go to Boards</button>
      </Link>

      {/* Add Player Form */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <input placeholder="Name" value={newPlayer.name} onChange={e => setNewPlayer({ ...newPlayer, name: e.target.value })} style={{ padding: "8px", background: "#111", color: "#fff", border: "1px solid #333" }} />
        <input placeholder="Position" value={newPlayer.position} onChange={e => setNewPlayer({ ...newPlayer, position: e.target.value })} style={{ padding: "8px", background: "#111", color: "#fff", border: "1px solid #333" }} />
        <input placeholder="School" value={newPlayer.school} onChange={e => setNewPlayer({ ...newPlayer, school: e.target.value })} style={{ padding: "8px", background: "#111", color: "#fff", border: "1px solid #333" }} />
        <input placeholder="Year" value={newPlayer.year} onChange={e => setNewPlayer({ ...newPlayer, year: e.target.value })} style={{ padding: "8px", background: "#111", color: "#fff", border: "1px solid #333" }} />
        <input placeholder="Twitter URL" value={newPlayer.twitter} onChange={e => setNewPlayer({ ...newPlayer, twitter: e.target.value })} style={{ padding: "8px", background: "#111", color: "#fff", border: "1px solid #333" }} />
        <button onClick={addPlayer} style={{ padding: "8px 12px", background: "#3b82f6", border: "none", color: "#fff", cursor: "pointer" }}>Add Player</button>
      </div>

      {/* Search */}
      <input placeholder="Search: 2026 DB New England..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "20px", background: "#111", color: "#fff", border: "1px solid #333" }} />

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
        {/* Player List */}
        <div>
          {filteredPlayers.map((player, index) => (
            <motion.div key={index} whileHover={{ scale: 1.02 }}>
              <div onClick={() => setSelectedPlayer(player)} style={{ background: "#111", border: "1px solid #222", padding: "15px", marginBottom: "10px", cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontWeight: "bold" }}>{player.name}</p>
                    <p style={{ fontSize: "12px", color: "#aaa" }}>{player.position} | {player.school} | {player.board}</p>
                  </div>
                  <div style={{ color: "#3b82f6" }}>{player.year}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Player Panel */}
        <div>
          {selectedPlayer ? (
            <div style={{ background: "#111", border: "1px solid #3b82f6", padding: "15px" }}>
              <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>{selectedPlayer.name}</h2>
              <p>{selectedPlayer.position} - {selectedPlayer.school}</p>
              <p>Class: {selectedPlayer.year}</p>
              <p>Board: {selectedPlayer.board}</p>
              <p>Contacted: {selectedPlayer.contacted ? "Yes" : "No"}</p>
              <div style={{ marginTop: "10px" }}>
  <select
    value={selectedPlayer.board}
    onChange={(e) => movePlayerToBoard(selectedPlayer, e.target.value)}
    style={{ width: "100%", padding: "10px", background: "#111", color: "#fff", border: "1px solid #333" }}
  >
    {boards.map((board) => (
      <option key={board} value={board}>{board}</option>
    ))}
  </select>

  <button
    onClick={() => movePlayerToBoard(selectedPlayer, selectedPlayer.board)}
    style={{ width: "100%", marginTop: "10px", padding: "10px", background: "#3b82f6", color: "#fff", border: "none", cursor: "pointer" }}
  >
    Add to Board
  </button>
</div>

              <button onClick={() => window.open(selectedPlayer.twitter)} style={{ width: "100%", marginTop: "10px", padding: "10px", background: "#3b82f6", border: "none", color: "#fff", cursor: "pointer" }}>Open Twitter</button>

              <select onChange={e => movePlayerToBoard(selectedPlayer, e.target.value)} value={selectedPlayer.board} style={{ width: "100%", marginTop: "10px", padding: "10px", background: "#111", color: "#fff", border: "1px solid #333" }}>
                {defaultBoards.map(board => <option key={board} value={board}>{board}</option>)}
              </select>

              <button onClick={() => toggleContacted(selectedPlayer)} style={{ width: "100%", marginTop: "10px", padding: "10px", cursor: "pointer" }}>{selectedPlayer.contacted ? "Mark Not Contacted" : "Mark Contacted"}</button>
            </div>
          ) : (
            <div style={{ color: "#555" }}>Select a player</div>
          )}
        </div>
      </div>
    </div>
  );
}
