"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Player {
  name: string;
  position: string;
  school: string;
  year: string;
  twitter: string;
  board: string;
  contacted: boolean;
}

export default function WarRoomPage() {
  const router = useRouter();
  const [players, setPlayers] = useState<Player[]>([]);
  const [boards, setBoards] = useState<string[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [search, setSearch] = useState("");
  const [newPlayer, setNewPlayer] = useState({ name: "", position: "", school: "", year: "", twitter: "" });
  const [newBoard, setNewBoard] = useState("");

  // Load players and boards from localStorage
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

  // Add a new board
  const addBoard = () => {
    if (!newBoard) return;
    const updatedBoards = [...boards, newBoard];
    setBoards(updatedBoards);
    localStorage.setItem("boards", JSON.stringify(updatedBoards));
    setNewBoard("");
  };

  // Move player to board and save + redirect
  const movePlayerToBoardAndRedirect = (player: Player, board: string) => {
    if (!player || !board) return;

    const updatedPlayers = players.map(p => p === player ? { ...p, board } : p);
    setPlayers(updatedPlayers);
    localStorage.setItem("players", JSON.stringify(updatedPlayers));

    if (selectedPlayer === player) setSelectedPlayer({ ...player, board });

    router.push('/boards');
  };

  // Filter players
  const filteredPlayers = players.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", fontFamily: "Arial" }}>
      {/* Header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 40px", borderBottom: "1px solid #222" }}>
        <h1 style={{ color: "#3b82f6" }}>The War Room</h1>
        <nav style={{ display: "flex", gap: "20px" }}>
          <Link href="/" style={{ color: "#fff" }}>Home</Link>
          <Link href="/boards" style={{ color: "#3b82f6", fontWeight: "bold" }}>Boards</Link>
          <Link href="#" style={{ color: "#fff" }}>Contact</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={{ display: "flex", justifyContent: "space-between", padding: "60px 40px", background: "#111" }}>
        <div style={{ maxWidth: "50%" }}>
          <h2 style={{ fontSize: "36px", color: "#3b82f6", marginBottom: "20px" }}>Your Football Recruiting Command Center</h2>
          <p style={{ fontSize: "18px", marginBottom: "30px" }}>Find, contact, and track top athletes across regions quickly. Organize them into boards and communicate through Twitter instantly.</p>
          <div style={{ display: "flex", gap: "20px" }}>
            <Link href="/" style={{ padding: "12px 24px", background: "#3b82f6", color: "#fff", textDecoration: "none" }}>Go to War Room</Link>
            <button style={{ padding: "12px 24px", background: "#fff", color: "#000", border: "none", cursor: "pointer" }}>Request Demo</button>
          </div>
        </div>
        <div style={{ maxWidth: "45%" }}>
          {/* Placeholder for hero image or animation */}
          <div style={{ width: "100%", height: "300px", background: "#222", borderRadius: "8px" }}></div>
        </div>
      </section>

      {/* Main Section */}
      <main style={{ display: "flex", padding: "40px", gap: "40px" }}>
        {/* Player List */}
        <div style={{ flex: 1 }}>
          <input type="text" placeholder="Search Players..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "20px", background: "#111", color: "#fff", border: "1px solid #333" }} />

          {filteredPlayers.map((player, idx) => (
            <motion.div key={idx} layout style={{ background: "#111", padding: "15px", border: "1px solid #333", cursor: "pointer", marginBottom: "10px" }} onClick={() => setSelectedPlayer(player)}>
              <p style={{ fontWeight: "bold" }}>{player.name}</p>
              <p>{player.position} - {player.school}</p>
              <p>Class {player.year}</p>
            </motion.div>
          ))}
        </div>

        {/* Selected Player Panel */}
        {selectedPlayer && (
          <div style={{ flex: 1, background: "#111", padding: "20px", border: "1px solid #3b82f6", borderRadius: "8px" }}>
            <h2 style={{ marginBottom: "10px" }}>{selectedPlayer.name}</h2>
            <p>{selectedPlayer.position} - {selectedPlayer.school}</p>
            <p>Class: {selectedPlayer.year}</p>
            <p>Board: {selectedPlayer.board || "None"}</p>
            <p>Contacted: {selectedPlayer.contacted ? "Yes" : "No"}</p>
            <button onClick={() => window.open(selectedPlayer.twitter)} style={{ marginTop: "10px", padding: "8px 12px", background: "#3b82f6", color: "#fff", border: "none", cursor: "pointer" }}>Open Twitter</button>

            <div style={{ marginTop: "15px" }}>
              <select value={selectedPlayer.board || ""} onChange={e => setSelectedPlayer({ ...selectedPlayer, board: e.target.value })} style={{ width: "100%", padding: "10px", background: "#111", color: "#fff", border: "1px solid #333" }}>
                <option value="" disabled>Select Board</option>
                {boards.map(board => <option key={board} value={board}>{board}</option>)}
              </select>
              <button onClick={() => selectedPlayer.board && movePlayerToBoardAndRedirect(selectedPlayer, selectedPlayer.board)} style={{ width: "100%", marginTop: "10px", padding: "10px", background: "#3b82f6", color: "#fff", border: "none", cursor: "pointer" }}>Send to Board</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
