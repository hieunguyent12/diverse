import { useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import fetcher from "../utils/fetcher";

export default function useAllPlaylists() {
  const { data, error } = useSWR("/api/playlists", fetcher);
  const router = useRouter();
  const isLoading = !error && !data;

  useEffect(() => {
    if (!data?.auth && !isLoading) {
      router.replace("/");
    }
  }, [data, isLoading, router]);

  return {
    data,
    isPlaylistsLoading: isLoading,
    isError: error,
  };
}
