const GITHUB_API_URL = "https://api.github.com";

export async function getRepoStars(name: string): Promise<number> {
  const response = await fetch(`${GITHUB_API_URL}/repos/${name}`);

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const repo = await response.json();

  return repo.stargazers_count;
}
