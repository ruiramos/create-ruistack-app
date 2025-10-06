import { test, expect } from "@playwright/experimental-ct-react";
import RepoStars from "./repo-stars";

test("should render the component with example data", async ({ mount }) => {
  const component = await mount(
    <RepoStars
      repoName="facebook/react"
      setRepoName={() => {}}
      data={{ stars: 999 }}
      isLoading={false}
      isRefetching={false}
      isSuccess={true}
      isError={false}
      refetch={() => {}}
      error={null}
    />,
  );
  await expect(component).toContainText("Stars on facebook/react: ✨ 999 ✨");
});
