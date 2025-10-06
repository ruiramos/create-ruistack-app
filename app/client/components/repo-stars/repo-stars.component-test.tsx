import { test, expect } from "@playwright/experimental-ct-react";
import RepoStars from "./repo-stars";

test("should render the component with example data", async ({ mount }) => {
  const repoName = "facebook/react";
  const stars = 999;

  const component = await mount(
    <RepoStars
      repoName={repoName}
      setRepoName={() => {}}
      data={{ stars }}
      isLoading={false}
      isRefetching={false}
      isSuccess={true}
      isError={false}
      refetch={() => {}}
      error={null}
    />,
  );
  await expect(component).toContainText(`Stars on ${repoName}: ✨ ${stars} ✨`);
});
