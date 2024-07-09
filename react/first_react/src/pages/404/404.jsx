import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function FourOFour() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", height: "70vh", alignItems: "center", justifyContent: "center" }}>
      <Typography variant="h3">404</Typography>
      <Typography variant="h5">Not found</Typography>
    </Box>
  )
}
