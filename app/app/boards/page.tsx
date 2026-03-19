"use client";

import React, { useState, useEffect } from "react";
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

export default function BoardsPage() {
  const [boards, setBoards] = useState<string[]>([]);
  const [newBoardName, setNewBoardName] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    const savedBoards = localStorage.getItem("boards");
    if (savedBoards) setBoards(JSON.parse(savedBoards));

    const savedPlayers = localStorage.getItem("players");
    if (savedPlayers) setPlayers(JSON.parse(savedPlayers));
  }, []);

  // Save boards to localStorage
  useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(boards));
  }, [boards]);

  const addBoard = () => {
    if (!newBoardName) return;
    setBoards([...boards, newBoardName]);
    setNewBoardName("");
  };

  const filteredPlayers = selectedBoard ? players.filter(p => p.board === selectedBoard) : [];

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ fontSize: "28px", color: "#3b82f6", marginBottom: "20px" }}>BOARD BUILDER</h1>

      <Link href="/">
        <button style={{ padding: "10px 15px", marginBottom: "20px", background: "#3b82f6", color: "#fff", border: "none", cursor: "pointer" }}>Back to War Room</button>
      </Link>

      {/* Add Board Form */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input placeholder="New Board Name" value={newBoardName} onChange={e => setNewBoardName(e.target.value)} style={{ padding: "8px", background: "#111", color: "#fff", border: "1px solid #333" }} />
        <button onClick={addBoard} style={{ padding: "8px 12px", background: "#3b82f6", border: "none", color: "#fff", cursor: "pointer" }}>Create Board</button>
      </div>

      {/* Board Selector */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        {boards.map(board => (
          <button key={board} onClick={() => setSelectedBoard(board)} style={{ padding: "8px 12px", background: selectedBoard === board ? "#3b82f6" : "#111", color: "#fff", border: "1px solid #333", cursor: "pointer" }}>{board}</button>
        ))}
      </div>

      {/* Player List for selected board */}
      <div>
        {selectedBoard ? (
          filteredPlayers.length > 0 ? (
            filteredPlayers.map((player, idx) => (
              <div key={idx} style={{ background: "#111", border: "1px solid #222", padding: "15px", marginBottom: "10px" }}>
                <p style={{ fontWeight: "bold" }}>{player.name}</p>
                <p>{player.position} - {player.school} | Class {player.year}</p>
                <p>Contacted: {player.contacted ? "Yes" : "No"}</p>
                <button onClick={() => window.open(player.twitter)} style={{ padding: "8px", background: "#3b82f6", border: "none", color: "#fff", cursor: "pointer" }}>Open Twitter</button>
              </div>
            ))
          ) : (
            <p style={{ color: "#555" }}>No players in this board.</p>
          )
        ) : (
          <p style={{ color: "#555" }}>Select a board to view players.</p>
        )}
      </div>
    </div>
  );
}
