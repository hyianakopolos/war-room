import React, { useState } from "react";
import { motion } from "framer-motion";

const mockPlayers = [
  { name: "Jayden Carter", position: "DB", school: "Boston College HS", year: "2026", twitter: "https://twitter.com" },
  { name: "Marcus Lee", position: "WR", school: "Springfield Central", year: "2027", twitter: "https://twitter.com" },
  { name: "Tyrese Johnson", position: "LB", school: "Worcester Tech", year: "2026", twitter: "https://twitter.com" }
];

export default function WarRoomApp() {
  const [search, setSearch] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const filteredPlayers = mockPlayers.filter(p =>
    `${p.name} ${p.position} ${p.school} ${p.year}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ fontSize: "28px", color: "#3b82f6", marginBottom: "20px" }}>THE WAR ROOM</h1>

      <input
        placeholder="Search: 2026 DB New England..."
        style={{ width: "100%", padding: "10px", marginBottom: "20px", background: "#111", color: "#fff", border: "1px solid #333" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
        {/* Player List */}
        <div>
          {filteredPlayers.map((player, index) => (
            <motion.div key={index} whileHover={{ scale: 1.02 }}>
              <div
                onClick={() => setSelectedPlayer(player)}
                style={{
                  background: "#111",
                  border: "1px solid #222",
                  padding: "15px",
                  marginBottom: "10px",
                  cursor: "pointer"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontWeight: "bold" }}>{player.name}</p>
                    <p style={{ fontSize: "12px", color: "#aaa" }}>{player.position} | {player.school}</p>
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

              <button
                style={{ width: "100%", marginTop: "10px", padding: "10px", background: "#3b82f6", border: "none", color: "#fff" }}
                onClick={() => window.open(selectedPlayer.twitter)}
              >
                Open Twitter
              </button>

              <button style={{ width: "100%", marginTop: "10px", padding: "10px" }}>
                Add to Board
              </button>

              <button style={{ width: "100%", marginTop: "10px", padding: "10px" }}>
                Mark Contacted
              </button>
            </div>
          ) : (
            <div style={{ color: "#555" }}>Select a player</div>
          )}
        </div>
      </div>
    </div>
  );
}
git reset --hard <previous-commit-hash>
