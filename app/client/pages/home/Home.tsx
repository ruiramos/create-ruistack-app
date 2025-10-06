import { useState } from "react";
import reactLogo from "~/client/assets/react.svg";
import viteLogo from "~/client/assets/vite.svg";
import { Button } from "~/client/components/ui/button";
import { Input } from "~/client/components/ui/input";
import Layout from "~/client/layouts/DefaultLayout";
import styles from "./Home.module.css";
import useFetchStars from "~/client/hooks/use-fetch-stars";

function App() {
  const [count, setCount] = useState(0);
  const [repoName, setRepoName] = useState("");

  const { data, isLoading, isRefetching, isSuccess, isError, refetch, error } =
    useFetchStars(repoName);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (repoName.trim()) {
      console.log("Fetching stars for:", repoName);
      refetch();
    }
  };

  return (
    <Layout>
      <div className="text-center my-4">
        <div className="flex flex-row justify-center my-4 gap-4">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className={styles.logo} alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img
              src={reactLogo}
              className={`${styles.logo} ${styles.react}`}
              alt="React logo"
            />
          </a>
        </div>
        <h1 className="text-5xl font-semibold my-4">Vite + React</h1>
        <div className={`py-4 space-y-2`}>
          <Button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </Button>
        </div>
        <div className={`py-4 space-y-2`}>
          <form
            onSubmit={handleFormSubmit}
            className="flex flex-row w-1/4 gap-2 mx-auto"
          >
            <Input
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              placeholder="repo, e.g. facebook/react"
            />
            <Button>Fetch stars</Button>
          </form>
          <div>
            {isLoading || isRefetching ? (
              <p>Loading...</p>
            ) : isSuccess ? (
              <div>
                Stars on <pre className="inline text-sm">{repoName}</pre>: ✨{" "}
                {data.stars} ✨
              </div>
            ) : isError ? (
              <p>Error: {JSON.parse(error.message).message}</p>
            ) : null}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
