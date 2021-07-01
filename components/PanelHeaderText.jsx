import { Text } from "@chakra-ui/react";

export default function PanelHeaderText({ children, ...props }) {
  return (
    <Text {...props} fontWeight="medium" fontSize="xl" flex="1">
      {children}
    </Text>
  );
}
