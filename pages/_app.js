import { ChakraProvider, Container } from "@chakra-ui/react";
import ContextProvider from "../components/context";

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <ChakraProvider>
        {/* <Container> */}
        <Component {...pageProps} />
        {/* </Container> */}
      </ChakraProvider>
    </ContextProvider>
  );
}

export default MyApp;
