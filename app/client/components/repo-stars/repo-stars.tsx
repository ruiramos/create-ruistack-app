import { Input } from "../ui/input";
import { Button } from "../ui/button";

const RepoStars: React.FC<{
  repoName: string;
  setRepoName: (name: string) => void;
  data: { stars: number };
  isLoading: boolean;
  isRefetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  refetch: () => void;
  error: any;
}> = ({
  repoName,
  setRepoName,
  data,
  isLoading,
  isRefetching,
  isSuccess,
  isError,
  refetch,
  error,
}) => {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (repoName.trim()) {
      console.log("Fetching stars for:", repoName);
      refetch();
    }
  };

  return (
    <div>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-row w-1/4 gap-2 mx-auto"
      >
        <Input
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
          placeholder="repo, e.g. facebook/react"
        />
        <Button disabled={isLoading || isRefetching || !repoName.trim()}>
          Fetch stars
        </Button>
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
  );
};

export default RepoStars;
