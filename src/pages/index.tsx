import Head from "next/head";
import { UsernameForm } from "~/components/usernameForm";

export default function Home() {
  return (
    <>
      <Head>
        <title>Database Demo</title>
        <meta
          name="description"
          content="This is a demo to try out the high-score database."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <UsernameForm />
      </main>
    </>
  );
}
