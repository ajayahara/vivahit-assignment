import { Box, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="gray.900" mb="1" p="4">
      <Flex align="center">
        <Heading color="white" size="md">
          <Link to="/">Crypto World</Link>
        </Heading>
      </Flex>
    </Box>
  );
};

export { Navbar };
