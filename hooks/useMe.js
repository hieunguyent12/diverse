import useSWR from "swr";
import fetcher from "../utils/fetcher";

export default function useMe() {
  const { data, error } = useSWR(`/api/me`, fetcher);

  return {
    me: data,
    isLoading: !error && !data,
    isError: error,
  };
}
