"use client";

import { useState } from "react";
import { teamRaxBySeason, Season } from "../../data/team";

const seasons: Season[] = ["2022-23", "2023-24", "2024-25"];

const multipliers = [
  { label: "1x", value: 1, color: "text-white" },
  { label: "1.2x", value: 1.2, color: "text-gray-400" },
  { label: "1.4x", value: 1.4, color: "text-green-400" },
  { label: "1.6x", value: 1.6, color: "text-yellow-400" },
  { label: "2x", value: 2, color: "text-red-400" },
  { label: "2.5x", value: 2.5, color: "text-purple-400" },
  { label: "4x", value: 4, color: "text-yellow-500" },
  { label: "6x", value: 6, color: "text-pink-400" }
];

const teamNames: Record<string,string> = {
ATL:"Atlanta Hawks",
BKN:"Brooklyn Nets",
BOS:"Boston Celtics",
CHA:"Charlotte Hornets",
CHI:"Chicago Bulls",
CLE:"Cleveland Cavaliers",
DAL:"Dallas Mavericks",
DEN:"Denver Nuggets",
DET:"Detroit Pistons",
GSW:"Golden State Warriors",
HOU:"Houston Rockets",
IND:"Indiana Pacers",
LAC:"Los Angeles Clippers",
LAL:"Los Angeles Lakers",
MEM:"Memphis Grizzlies",
MIA:"Miami Heat",
MIL:"Milwaukee Bucks",
MIN:"Minnesota Timberwolves",
NOP:"New Orleans Pelicans",
NYK:"New York Knicks",
OKC:"Oklahoma City Thunder",
ORL:"Orlando Magic",
PHI:"Philadelphia 76ers",
PHX:"Phoenix Suns",
POR:"Portland Trail Blazers",
SAC:"Sacramento Kings",
SAS:"San Antonio Spurs",
TOR:"Toronto Raptors",
UTA:"Utah Jazz",
WAS:"Washington Wizards"
};

export default function LeaderboardPage() {

  const [selectedSeason, setSelectedSeason] = useState<Season>("2024-25");
  const [search, setSearch] = useState("");
  const [teamMultipliers, setTeamMultipliers] = useState<Record<string, number>>({});

  const leaderboard = [...teamRaxBySeason]
    .filter((team) =>
      teamNames[team.team].toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => b[selectedSeason] - a[selectedSeason]);

  function setMultiplier(team:string,value:number){
    setTeamMultipliers(prev=>({...prev,[team]:value}));
  }

  return (

    <main className="min-h-screen flex justify-center bg-slate-950 text-white p-8">

      <div className="w-[65%]">

        <h1 className="text-4xl font-bold mb-8">
          NBA Rax Leaderboard
        </h1>

        {/* season selector */}

        <div className="mb-6">

          <label className="mr-3 font-semibold">
            Season
          </label>

          <select
            value={selectedSeason}
            onChange={(e)=>setSelectedSeason(e.target.value as Season)}
            className="bg-slate-800 p-2 rounded"
          >

            {seasons.map(season=>(
              <option key={season}>{season}</option>
            ))}

          </select>

        </div>

        {/* search */}

        <input
          type="text"
          placeholder="Search team..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="mb-6 w-full p-2 bg-slate-800 rounded"
        />

        {/* column headers */}

        <div className="flex justify-between border-b border-slate-600 pb-2 mb-2 font-semibold text-gray-300">
          <div>Team</div>
          <div className="flex gap-8">
            <div>Multiplier</div>
            <div>RAX</div>
          </div>
        </div>

        {/* leaderboard */}

        <div>

          {leaderboard.map((team,index)=>{

            const multiplier = teamMultipliers[team.team] || 1;
            const adjusted = Math.round(team[selectedSeason] * multiplier);

            const color =
              multipliers.find(m=>m.value===multiplier)?.color || "text-white";

            return(

              <div
                key={team.team}
                className="flex justify-between border-b border-slate-700 py-3"
              >

                <div className="font-bold text-white">
                  {index+1}. {teamNames[team.team]}
                </div>

                <div className="flex gap-8 items-center">

                  <select
                    value={multiplier}
                    onChange={(e)=>setMultiplier(team.team,Number(e.target.value))}
                    className={`bg-slate-800 p-1 rounded ${color}`}
                  >

                    {multipliers.map(m=>(
                      <option key={m.value} value={m.value}>
                        {m.label}
                      </option>
                    ))}

                  </select>

                  <div className={`font-bold ${color}`}>
                    {adjusted}
                  </div>

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </main>

  );

}