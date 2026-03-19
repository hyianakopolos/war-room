"use client";
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
  const [players, setPlayers] = useState<Player[]>([]);
  const [newBoard, setNewBoard] = useState("");
  const [expandedBoard, setExpandedBoard] = useState<string | null>(null);

  useEffect(() => {
    const savedBoards = localStorage.getItem("boards");
    if (savedBoards) setBoards(JSON.parse(savedBoards));

    const savedPlayers = localStorage.getItem("players");
    if (savedPlayers) setPlayers(JSON.parse(savedPlayers));
  }, []);

  const addBoard = () => {
    if (!newBoard) return;
    const updatedBoards = [...boards, newBoard];
    setBoards(updatedBoards);
    localStorage.setItem("boards", JSON.stringify(updatedBoards));
    setNewBoard("");
  };

  const deleteBoard = (boardToDelete: string) => {
    const updatedBoards = boards.filter(b => b !== boardToDelete);
    setBoards(updatedBoards);
    localStorage.setItem("boards", JSON.stringify(updatedBoards));
  };

  const getPlayersForBoard = (board: string) => {
    return players.filter(p => p.board === board);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "20px", fontFamily: "Arial" }}>
      <div style={{ marginBottom: "20px" }}>
        <Link href="/" style={{ color: "#3b82f6", textDecoration: "underline" }}>← Back to War Room</Link>
      </div>

      <h1 style={{ fontSize: "28px", color: "#3b82f6", marginBottom: "20px" }}>BOARDS</h1>

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input type="text" placeholder="New Board Name" value={newBoard} onChange={e => setNewBoard(e.target.value)} style={{ padding: "10px", flexGrow: 1, background: "#111", color: "#fff", border: "1px solid #333" }} />
        <button onClick={addBoard} style={{ padding: "10px", background: "#3b82f6", color: "#fff", border: "none", cursor: "pointer" }}>Add Board</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {boards.map((board, idx) => (
          <div key={idx} style={{ background: "#111", padding: "15px", border: "1px solid #3b82f6" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ cursor: "pointer" }} onClick={() => setExpandedBoard(expandedBoard === board ? null : board)}>{board}</span>
              <button onClick={() => deleteBoard(board)} style={{ background: "#ef4444", color: "#fff", border: "none", padding: "5px 10px", cursor: "pointer" }}>Delete</button>
            </div>
            {expandedBoard === board && (
              <div style={{ marginTop: "10px", paddingLeft: "10px" }}>
                {getPlayersForBoard(board).length > 0 ? (
                  getPlayersForBoard(board).map((player, pIdx) => (
                    <div key={pIdx} style={{ borderBottom: "1px solid #333", padding: "5px 0" }}>
                      {player.name} - {player.position} ({player.school})
                    </div>
                  ))
                ) : (
                  <p style={{ fontStyle: "italic" }}>No players in this board yet.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
