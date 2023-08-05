import { type FC } from "react";
import { api } from "~/utils/api";

export interface IUser {
  id: number;
  uniqueId: string;
  email: string | null;
  name: string | null;
  wins: number;
  losses: number;
  createdAt: Date;
  updatedAt: Date;
}

export const User: FC<IUser> = (props) => {
  const winMutation = api.user.win.useMutation();
  const lossMutation = api.user.loss.useMutation();
  const resetMutation = api.user.reset.useMutation();
  const handleWin = () => {
    winMutation.mutate({ username: props.uniqueId });
  };
  const handleLoss = () => {
    lossMutation.mutate({ username: props.uniqueId });
  };
  const handleReset = () => {
    resetMutation.mutate({ username: props.uniqueId });
  };
  const isLoading =
    winMutation.isLoading || lossMutation.isLoading || resetMutation.isLoading;
  return (
    <div className="mt-5 flex flex-col items-center justify-center gap-5 text-xl">
      <h1>User: {props.uniqueId}</h1>
      <div className="flex flex-row items-center gap-5">
        <div>Wins: {props.wins}</div>
        <button
          className="flex h-10 w-10 flex-col items-center justify-center rounded-xl bg-pink-500 disabled:opacity-50"
          onClick={() => handleWin()}
          disabled={isLoading}
        >
          +
        </button>
      </div>
      <div className="flex flex-row items-center gap-5">
        <div>Losses: {props.losses}</div>
        <button
          className="flex h-10 w-10 flex-col items-center justify-center rounded-xl bg-pink-500 disabled:opacity-50"
          onClick={() => handleLoss()}
          disabled={isLoading}
        >
          +
        </button>
      </div>
      <div>
        <button
          className="flex h-20 w-20 flex-col items-center justify-center rounded-xl bg-red-500 disabled:opacity-50"
          onClick={() => handleReset()}
          disabled={isLoading}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
