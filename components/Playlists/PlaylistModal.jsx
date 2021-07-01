import {
  Box,
  Text,
  Button,
  // Modal,
  // ModalOverlay,
  // ModalContent,
  // ModalHeader,
  // ModalFooter,
  // ModalBody,
  // ModalCloseButton,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { nanoid } from "nanoid";

import usePlaylist from "../../hooks/usePlaylist";
import Modal from "../shared/Modal";

export default function PlaylistModal({ isOpen, onClose, selectedPlaylist }) {
  const { data, isLoading, isError, mutate } = usePlaylist(selectedPlaylist);

  const onDeleteClick = async (track) => {
    if (!selectedPlaylist) return;

    const uri = track.track.uri;

    const response = await fetch(`/api/playlist/${selectedPlaylist.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uri }),
    });

    const playlist = data.playlist;
    const tracks = playlist.items;

    const newTracks = tracks.filter((item) => item.track.id !== track.track.id);

    // mutate the state locally so we don't have to make another network request
    mutate(
      {
        ...data,
        playlist: {
          ...playlist,
          items: newTracks,
        },
      },
      false
    );
  };

  const renderBody = () => {
    if (isLoading) {
      return <Text>Loading...</Text>;
    }

    const { playlist } = data;

    if (playlist?.items.length === 0) {
      return <Text>This playlist is empty</Text>;
    }

    return (
      <>
        {playlist?.items.map((item) => (
          <Box
            key={nanoid()}
            d="flex"
            alignItems="center"
            mt="2"
            role="group"
            _hover={{
              cursor: "pointer",
            }}
            p="1"
          >
            <Image
              src={item.track.album.images[2].url}
              alt="track image"
              w="40px"
              h="40px"
              rounded="sm"
            />

            <Box ml="3" d="flex" flexDirection="column" flex="1">
              <Text>{item.track.name}</Text>

              <Box m="0" p="0">
                {item.track.artists.map((artist, i) => (
                  <Text as="span" key={nanoid()} color="gray.500" fontSize="sm">
                    {artist.name}
                    {i !== item.track.artists.length - 1 && ", "}
                  </Text>
                ))}
              </Box>
            </Box>
            <IconButton
              d="none"
              bg="none"
              icon={<DeleteIcon color="red.300" role="deleteBtn" />}
              _groupHover={{ display: "block" }}
              onClick={() => onDeleteClick(item)}
            />
          </Box>
        ))}
      </>
    );
  };

  const renderFooter = () => {
    <Button colorScheme="blue" onClick={onClose}>
      Close
    </Button>;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={selectedPlaylist.name}
      renderBody={renderBody}
      renderFooter={renderFooter}
    />
  );
}
