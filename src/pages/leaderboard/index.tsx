import { Leaderboard } from "~/components/leaderboard";
import { api } from "~/utils/api";

export default function LeaderboardPage() {
  const { isLoading, error, isError, data } = api.user.getLeaderboardUsers.useQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  if (!data || !data.length) {
    return <div>There are no users in the leaderboard.</div>
  }
  return (
    <div>
      <Leaderboard users={data} />
    </div>
  );
}