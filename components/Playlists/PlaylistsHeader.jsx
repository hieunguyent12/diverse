import { useState } from "react";
import { Box, Button, Input, useDisclosure } from "@chakra-ui/react";

import PanelHeaderText from "../PanelHeaderText";
import Modal from "../shared/Modal";

export default function PlaylistsHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [playlistName, setPlaylistName] = useState("");

  const onAddPlaylist = async () => {
    if (playlistName !== "") {
      const response = await fetch(`/api/playlists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playlistName }),
      });
      console.log(response);
    }
  };

  return (
    <>
      <Box d="flex">
        <PanelHeaderText>My Playlists</PanelHeaderText>
        <Button colorScheme="green" onClick={onOpen}>
          add playlist
        </Button>
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Add a playlist"
        renderBody={() => {
          return (
            <Input
              type="text"
              placeholder="enter a name"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
            />
          );
        }}
        renderFooter={() => {
          return (
            <Button colorScheme="blue" onClick={onAddPlaylist}>
              Add
            </Button>
          );
        }}
      ></Modal>
    </>
  );
}
