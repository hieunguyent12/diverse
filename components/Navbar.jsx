import {
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  useColorMode,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export default function Navbar({ me }) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box d="flex" width="100%" justifyContent="space-between">
      <Text fontSize="2xl" fontWeight="bold">
        diverse
      </Text>
      <InputGroup w="50%" size="md" mx="10">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input placeholder="Search anything" variant="filled" />
      </InputGroup>
      <Menu>
        <MenuButton
          as={Box}
          rounded="full"
          variant="link"
          cursor="pointer"
          width="32px"
          outline="none"
        >
          <Avatar size="sm" boxShadow="none" mt="1" />
        </MenuButton>
        <MenuList>
          <MenuItem>{me.display_name}</MenuItem>
          <MenuItem onClick={toggleColorMode}>Toggle Theme</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
