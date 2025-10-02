import { useQuery } from "@tanstack/react-query";

const useFetchStars = (repoName: string) =>
  useQuery({
    queryKey: ["stars", repoName],
    enabled: false,
    retry: false,
    queryFn: async () => {
      const response = await fetch(`/api/stars?repo=${repoName}`);

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
      }

      return await response.json();
    },
  });

export default useFetchStars;
