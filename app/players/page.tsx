"use client";

import { useState } from "react";
import { players } from "../../data/players";
import { boosters } from "../../data/playerBoosters";

export default function PlayersPage() {

  const sortedPlayers = [...players].sort((a,b)=>b.rax-a.rax);

  const rankedPlayers = sortedPlayers.map((p,i)=>({
    ...p,
    rank:i+1
  }));

  const [search,setSearch] = useState("");

  const [selectedBoosters,setSelectedBoosters] =
  useState<{[key:string]:number}>({});

  const visiblePlayers = rankedPlayers.filter(player =>
    player.player.toLowerCase().includes(search.toLowerCase())
  );

  return (

<main className="min-h-screen flex justify-center bg-slate-950 text-white p-8">

<div className="w-[65%]">

<h1 className="text-4xl font-bold mb-8">
NBA Player RAX 2024-2025
</h1>

<input
type="text"
placeholder="Search player..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="mb-6 w-full p-2 bg-slate-800 rounded"
/>

{/* HEADER */}

<div className="grid grid-cols-[80px_1fr_220px_180px] font-bold border-b border-slate-600 pb-2 mb-2">

<div>Rank</div>
<div>Player</div>
<div>Booster</div>
<div className="text-right">RAX</div>

</div>

{/* PLAYER ROWS */}

{visiblePlayers.map(player=>{

const boosterIndex = selectedBoosters[player.player] ?? 0;
const booster = boosters[boosterIndex];

const boostedRax = Math.round(player.rax * booster.multiplier);

return (

<div
key={player.player}
className="grid grid-cols-[80px_1fr_220px_180px] items-center border-b border-slate-700 py-3"
>

<div>{player.rank}</div>

<div className="font-bold">
{player.player}
</div>

<select
value={boosterIndex}
className={`bg-slate-800 p-1 rounded ${booster.color}`}
onChange={(e)=>
setSelectedBoosters({
...selectedBoosters,
[player.player]:Number(e.target.value)
})
}
>

{boosters.map((b,i)=>(
<option key={i} value={i}>
{b.label} ({b.multiplier}x)
</option>
))}

</select>

<div className={`text-right ${booster.color}`}>
{boostedRax.toLocaleString()}
</div>

</div>

);

})}

</div>

</main>

);

}