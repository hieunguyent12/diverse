import { useState } from "react";
import { Box, Button, Input, useDisclosure } from "@chakra-ui/react";

import PanelHeaderText from "../PanelHeaderText";
import Modal from "../shared/Modal";

export default function FriendsHeader() {
  const [name, setName] = useState("");
  const { isOpen, onClose, onOpen } = useDisclosure();

  const onAddFriend = () => {
    if (name !== "") {
      return;
    }
  };

  return (
    <Box d="flex">
      <PanelHeaderText>Friends</PanelHeaderText>
      <Button colorScheme="green" onClick={onOpen}>
        add friend
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Add a friend"
        renderBody={() => {
          return (
            <Input
              type="text"
              placeholder="enter a name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          );
        }}
        renderFooter={() => {
          return (
            <Button colorScheme="blue" onClick={onAddFriend}>
              Add
            </Button>
          );
        }}
      />
    </Box>
  );
}
