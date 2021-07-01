import useSWR from "swr";
import fetcher from "../utils/fetcher";

export default function usePlaylist(playlist) {
  const { data, error, mutate } = useSWR(
    `/api/playlist/${playlist.id}?url=${playlist.tracks.href}`,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
