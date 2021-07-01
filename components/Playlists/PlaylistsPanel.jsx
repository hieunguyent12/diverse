import { Box } from "@chakra-ui/react";
import PlaylistsHeader from "./PlaylistsHeader";
import PlaylistsContent from "./PlaylistsContent";

export default function PlaylistsPanel({ playlistsData }) {
  return (
    <Box mt="5">
      <PlaylistsHeader />
      <PlaylistsContent playlistsData={playlistsData} />
    </Box>
  );
}
