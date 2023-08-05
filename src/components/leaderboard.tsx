import { type FC } from "react";
import { type IUser } from "./user";

interface ILeaderboardProps {
  users: IUser[];
}

function getWinRate(user: IUser) {
  const totalGames = user.wins + user.losses;
  if (totalGames === 0) {
    return "N/A";
  }
  return `${Math.round((user.wins / totalGames) * 100)}%`;
}

export const Leaderboard: FC<ILeaderboardProps> = (props) => {
  return (
    <div>
      <div className="text-lg font-bold">Leaderboard</div>
      <div className="flex flex-col gap-10">
      {props.users.map((user) => {
        return (
          <div key={user.id} className="flex flex-row gap-5 text-md border-2 border-amber-950">
            <div>ID: {user.uniqueId}</div>
            <div>Wins: {user.wins}</div>
            <div>Losses: {user.losses}</div>
            <div>Win Rate: {getWinRate(user)}</div>
          </div>
        );
      })}
      </div>
    </div>
  );
};