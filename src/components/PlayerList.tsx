import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { User, Activity, ArrowUpRight, TrendingUp } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface Player {
  id: string;
  name: string;
  position: string;
  minutesPlayed?: string;
  distanceCovered: number;
  sprints: number;
  sprintIntensity?: number;
  compositeLoadScore?: number;
  fatigueIndex: number;
  riskScore: number;
  playability?: number;
}

interface PlayerListProps {
  players: Player[];
  videoLength?: number;
}

const getRiskClass = (score: number) => {
  if (score < 30) return 'bg-green-500/20 text-green-500 border-green-500/20';
  if (score < 60) return 'bg-amber-500/20 text-amber-500 border-amber-500/20';
  return 'bg-red-500/20 text-red-500 border-red-500/20';
};

const getPlayabilityClass = (score: number) => {
  if (score > 70) return 'bg-green-500/20 text-green-500 border-green-500/20';
  if (score > 40) return 'bg-amber-500/20 text-amber-500 border-amber-500/20';
  return 'bg-red-500/20 text-red-500 border-red-500/20';
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const PlayerList = ({ players = [], videoLength = 0 }: PlayerListProps) => {
  const [loading, setLoading] = useState(false);

  const enhancedPlayers = players.map(player => ({
    ...player,
    minutesPlayed: player.minutesPlayed,
  }));

  if (loading) {
    return (
      <div className="glass-panel rounded-lg p-6 animate-pulse space-y-4">
        <div className="h-8 bg-white/10 rounded-md w-64"></div>
        <div className="h-64 bg-white/5 rounded-md"></div>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Player Analysis</h2>
        <Badge variant="outline" className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500"></div> 
          Model Data
        </Badge>
      </div>
      
      {enhancedPlayers.length === 0 ? (
        <div className="bg-black/20 rounded-lg p-6 text-center">
          <p className="text-white/60">No player data available from your model</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-white/10">
                <TableHead className="text-white/70">Player ID</TableHead>
                <TableHead className="text-white/70">Minutes Played</TableHead>
                <TableHead className="text-white/70">
                  <div className="flex items-center gap-1">
                    <Activity size={14} />
                    Sprint Count
                  </div>
                </TableHead>
                <TableHead className="text-white/70">Sprint Intensity</TableHead>
                <TableHead className="text-white/70">Composite Load Score</TableHead>
                <TableHead className="text-white/70">Fatigue Index</TableHead>
                <TableHead className="text-white/70">Injury Risk</TableHead>
                <TableHead className="text-white/70">Playability</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enhancedPlayers.map((player) => (
                <TableRow key={player.id} className="border-b border-white/5">
                  <TableCell className="font-mono text-sm">{player.id}</TableCell>
                  <TableCell>{player.minutesPlayed}</TableCell>
                  <TableCell>{player.sprints}</TableCell>
                  <TableCell>{player.sprintIntensity.toFixed(3)}</TableCell>
                  <TableCell>
                    <Badge className="bg-athlete-blue/20 text-athlete-blue border-athlete-blue/20">
                      {player.compositeLoadScore}
                    </Badge>
                  </TableCell>
                  <TableCell>{player.fatigueIndex}%</TableCell>
                  <TableCell>
                  <Badge className={player.riskScore > 0.89 ? "bg-red-500 text-white" : "bg-green-500 text-white"}>
                    {player.riskScore > 0.89 ? "HIGH" : "LOW"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={player.playability < 11.0 ? "bg-red-500 text-white" : "bg-green-500 text-white"}>
                      {player.playability < 11.0 ? "Not Playable" : "Playable"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default PlayerList;
