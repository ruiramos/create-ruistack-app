import { useState } from "react";
import reactLogo from "~/client/assets/react.svg";
import viteLogo from "~/client/assets/vite.svg";
import { Button } from "~/client/components/ui/button";
import Layout from "~/client/layouts/DefaultLayout";
import styles from "./Home.module.css";
import RepoStars from "~/client/components/repo-stars/repo-stars";
import useFetchStars from "~/client/hooks/use-fetch-stars";

function App() {
  const [count, setCount] = useState(0);
  const [repoName, setRepoName] = useState("");

  const repoQueryHook = useFetchStars(repoName);

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
          <RepoStars
            repoName={repoName}
            setRepoName={setRepoName}
            {...repoQueryHook}
          />
        </div>
      </div>
    </Layout>
  );
}

export default App;
