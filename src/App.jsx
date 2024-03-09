import { Navbar } from "./components/NavBar";
import { AllRoute } from "./routes/AllRoute";
import { Box } from "@chakra-ui/react";
const App = () => {
  return (
    <>
      <Box w="100%" minH="100vh" bg="gray.800">
        <Navbar />
        <AllRoute />
      </Box>
    </>
  );
};
export default App;
