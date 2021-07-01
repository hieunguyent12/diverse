import { Box, Text, Avatar } from "@chakra-ui/react";

import FriendsHeader from "./FriendsHeader";

export default function FriendsPanel({ friends }) {
  const renderContent = () => {
    if (friends.length === 0) {
      return <Text opacity="0.4">You have no friends :(</Text>;
    } else {
      return friends.map((friend) => (
        <Box key={friend.id} d="flex" alignItems="center" mr="10">
          <Avatar size="sm" boxShadow="none" />
          <Text ml="2">{friend.name}</Text>
        </Box>
      ));
    }
  };
  return (
    <Box mt="8">
      <FriendsHeader />
      <Box mt="4" d="flex" flexWrap="wrap">
        {renderContent()}
      </Box>
    </Box>
  );
}
