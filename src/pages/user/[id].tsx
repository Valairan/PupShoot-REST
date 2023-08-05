import { useRouter } from "next/router";
import { User } from "~/components/user";
import { api } from "~/utils/api";

export default function Page() {
  const router = useRouter();
  const { isLoading, error, isError, data } = api.user.getUser.useQuery({ username: router.query.id }, {
    refetchInterval: 500,
  });

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <h1>Error: {error.message}</h1>
      </div>
    );
  }
  if (!data) {
    return (
      <div>
        <h1>No user found.</h1>
      </div>
    );
  }
  return (
    <div>
      <User {...data} />
    </div>
  );
}
