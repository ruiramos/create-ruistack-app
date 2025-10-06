import { test, expect } from "@playwright/experimental-ct-react";
import RepoStars from "./repo-stars";
import { useState } from "react";

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

test("button is disabled when input is empty", async ({ mount }) => {
  const repoName = "";

  const component = await mount(
    <RepoStars
      repoName={repoName}
      setRepoName={() => {}}
      data={{ stars: 0 }}
      isLoading={false}
      isRefetching={false}
      isSuccess={true}
      isError={false}
      refetch={() => {}}
      error={null}
    />,
  );
  await expect(component.locator("button")).toBeDisabled();
});

test("shows loading message while data is loading", async ({ mount }) => {
  const repoName = "example";

  const component = await mount(
    <RepoStars
      repoName={repoName}
      setRepoName={() => {}}
      data={{ stars: 0 }}
      isLoading={true}
      isRefetching={true}
      isSuccess={true}
      isError={false}
      refetch={() => {}}
      error={null}
    />,
  );
  await expect(component).toContainText(`Loading`);
});
