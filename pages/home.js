import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { Container } from "@chakra-ui/react";

import useMe from "../hooks/useMe";
import useAllPlaylists from "../hooks/useAllPlaylists";
import Navbar from "../components/Navbar";
import PlaylistsPanel from "../components/Playlists/PlaylistsPanel";
import FriendsPanel from "../components/Friends/FriendsPanel";

export default function Home() {
  const router = useRouter();
  const { me, isLoading, isError } = useMe();
  const playlistsData = useAllPlaylists();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!me?.auth && !isLoading) {
      router.replace("/");
    }
  }, [me, isLoading, router]);

  if (isError) {
    return <p>There was an error authenticating</p>;
  }

  if (isLoading) {
    return <p>Logging you in...</p>;
  }

  if (me?.auth) {
    return (
      <Container mt="2">
        <Navbar me={me} />
        <PlaylistsPanel playlistsData={playlistsData} />
        <FriendsPanel friends={me?.friends} />
      </Container>
    );
  }

  return <div>Redirecting...</div>;
}
