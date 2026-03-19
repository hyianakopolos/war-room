"use client";

import React, { useState, useEffect } from "react";
import Link from 'next/link';

export default function BoardsPage() {
  const [boards, setBoards] = useState<string[]>([]);
  const [newBoard, setNewBoard] = useState("");

  // Load boards from localStorage
  useEffect(() => {
    const savedBoards = localStorage.getItem("boards");
    if (savedBoards) setBoards(JSON.parse(savedBoards));
  }, []);

  // Add new board
  const addBoard = () => {
    if (!newBoard) return;
    const updatedBoards = [...boards, newBoard];
    setBoards(updatedBoards);
    localStorage.setItem("boards", JSON.stringify(updatedBoards));
    setNewBoard("");
  };

  // Delete board
  const deleteBoard = (boardToDelete: string) => {
    const updatedBoards = boards.filter(b => b !== boardToDelete);
    setBoards(updatedBoards);
    localStorage.setItem("boards", JSON.stringify(updatedBoards));
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "20px", fontFamily: "Arial" }}>
      <div style={{ marginBottom: "20px" }}>
        <Link href="/" style={{ color: "#3b82f6", textDecoration: "underline" }}>← Back to War Room</Link>
      </div>

      <h1 style={{ fontSize: "28px", color: "#3b82f6", marginBottom: "20px" }}>BOARDS</h1>

      {/* Add New Board */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input type="text" placeholder="New Board Name" value={newBoard} onChange={e => setNewBoard(e.target.value)} style={{ padding: "10px", flexGrow: 1, background: "#111", color: "#fff", border: "1px solid #333" }} />
        <button onClick={addBoard} style={{ padding: "10px", background: "#3b82f6", color: "#fff", border: "none", cursor: "pointer" }}>Add Board</button>
      </div>

      {/* Board List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {boards.map((board, idx) => (
          <div key={idx} style={{ background: "#111", padding: "15px", border: "1px solid #3b82f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>{board}</span>
            <button onClick={() => deleteBoard(board)} style={{ background: "#ef4444", color: "#fff", border: "none", padding: "5px 10px", cursor: "pointer" }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
