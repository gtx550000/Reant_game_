import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import HorizontalNonLinearStepper from "../register_game/step/step";

function App() {
  return (
    <Container>
      <Box sx={{ bgcolor: "" }} style={{ padding: "55px 30px 30px 30px" }}>
        <HorizontalNonLinearStepper />
      </Box>
    </Container>
  );
}

export default App;
