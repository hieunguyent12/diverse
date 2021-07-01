import { useState } from "react";
import { Box, Text, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import Placeholder from "./Placeholder";
import ListItem from "../ListItem";
import PlaylistModal from "./PlaylistModal";

export default function PlaylistsContent({ playlistsData }) {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isPlaylistsLoading } = playlistsData;

  const onPlaylistClick = async (playlist) => {
    setSelectedPlaylist(playlist);
    onOpen();
  };

  const onCloseModal = () => {
    setSelectedPlaylist(null);
    onClose();
  };

  if (isPlaylistsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Box mt="3" d="flex" w="100%" flexWrap="wrap">
        {data?.playlists.map((item) => (
          <ListItem
            key={item.id}
            width="140px"
            onClick={() => onPlaylistClick(item)}
          >
            <Placeholder />
            <Text ml="2" mt="2">
              {item.name}
            </Text>
          </ListItem>
        ))}
      </Box>
      {selectedPlaylist && (
        <PlaylistModal
          onClose={onCloseModal}
          isOpen={isOpen}
          selectedPlaylist={selectedPlaylist}
        />
      )}
    </>
  );
}
