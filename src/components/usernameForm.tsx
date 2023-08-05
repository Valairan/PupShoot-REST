import { useRouter } from "next/router";
import { type FC, useState, type FormEvent } from "react";
import { api } from "~/utils/api";

export const UsernameForm: FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const createUser = api.user.createUser.useMutation();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "") {
      alert("Please enter a username");
      return;
    }
    await createUser.mutateAsync({ username });
    await router.push(`/user/${username}`);
  };

  return (
    <div>
      <h1 className="text-lg font-bold">Database Demo</h1>
      {/* Form to get a unique username from the user */}
      <form
        onSubmit={(e) => {
          void handleSubmit(e);
        }}
      >
        <label className="font-bold" htmlFor="username">
          Create user:
        </label>
        <input
          className="ml-5 rounded-md border-2 border-green-400"
          type="text"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          className="ml-5 h-12 w-20 rounded-md border-2 border-orange-600 hover:bg-orange-200 active:bg-orange-300"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
