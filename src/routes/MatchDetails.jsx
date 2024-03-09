import useMatchData from '@/components/match/data/useMatchData';
import { useParams } from 'react-router-dom';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/ui/table';

function MatchDetails() {
    const { playerId, matchId } = useParams();
    const { participantsData } = useMatchData(matchId, playerId);

    if (!participantsData) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            {participantsData.length > 0 && (
                <div className="flex gap-8 m-8">
                    {renderTable(participantsData.slice(0, 5))}
                    {renderTable(participantsData.slice(5, 10))}
                </div>
            )}
        </div>
    );
}

function renderTable(data) {
    const tableClass = `h-96 border-4 border-[#32281E] Spiegel-Regular text-center text-[#F0E6D2] ${data[0].win ? 'bg-blue-500/10' : 'bg-red-500/10'}`;

    return (
        <Table className={tableClass}>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center">Player</TableHead>
                    <TableHead className="text-center">Level</TableHead>
                    <TableHead className="text-center">Champion</TableHead>
                    <TableHead className="text-center">KDA</TableHead>
                    <TableHead className="text-center">Creep Score</TableHead>
                    <TableHead className="text-center">Vision Score</TableHead>
                    <TableHead className="text-center">Damage Dealt</TableHead>
                    <TableHead className="text-center">Lane</TableHead>
                    <TableHead className="text-center">Ward Placed</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((participant, index) => (
                    <TableRow key={index}>
                        <TableCell>{participant.riotId}</TableCell>
                        <TableCell>{participant.champLevel}</TableCell>
                        <TableCell>{participant.championName}</TableCell>
                        <TableCell>{`${participant.kills}/${participant.deaths}/${participant.assists}`}</TableCell>
                        <TableCell>{participant.totalMinionsKilled}</TableCell>
                        <TableCell>{participant.visionScore}</TableCell>
                        <TableCell>{participant.totalDamageDealt}</TableCell>
                        <TableCell>{participant.lane}</TableCell>
                        <TableCell>{participant.wardsPlaced}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default MatchDetails;
