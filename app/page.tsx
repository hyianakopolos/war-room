import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">THE WAR ROOM</h1>

      <Input
        placeholder="Search: 2026 DB New England..."
        className="mb-6 bg-gray-900 border-gray-700"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-3 gap-6">
        {/* Player List */}
        <div className="col-span-2 space-y-4">
          {filteredPlayers.map((player, index) => (
            <motion.div key={index} whileHover={{ scale: 1.02 }}>
              <Card
                className="bg-gray-900 border border-gray-800 cursor-pointer"
                onClick={() => setSelectedPlayer(player)}
              >
                <CardContent className="p-4 flex justify-between">
                  <div>
                    <p className="font-semibold">{player.name}</p>
                    <p className="text-sm text-gray-400">{player.position} | {player.school}</p>
                  </div>
                  <div className="text-blue-400">{player.year}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Player Panel */}
        <div>
          {selectedPlayer ? (
            <Card className="bg-gray-900 border border-blue-500">
              <CardContent className="p-4 space-y-4">
                <h2 className="text-xl font-bold">{selectedPlayer.name}</h2>
                <p>{selectedPlayer.position} - {selectedPlayer.school}</p>
                <p>Class: {selectedPlayer.year}</p>

                <Button className="w-full bg-blue-500" onClick={() => window.open(selectedPlayer.twitter)}>
                  Open Twitter
                </Button>

                <Button className="w-full" variant="outline">
                  Add to Board
                </Button>

                <Button className="w-full" variant="outline">
                  Mark Contacted
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="text-gray-500">Select a player</div>
          )}
        </div>
      </div>
    </div>
  );
}
