import { Box } from "@chakra-ui/react";

export default function ListItem({ children, ...props }) {
  return (
    <Box
      d="flex"
      py="2"
      mr="3"
      my="2"
      borderWidth="1px"
      _hover={{
        cursor: "pointer",
        boxShadow: "base",
      }}
      transition="0.2s"
      rounded="md"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      {...props}
    >
      {children}
    </Box>
  );
}
