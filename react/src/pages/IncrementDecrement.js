import React, { useState } from "react";
import { Box, Button, Container, Grid, Typography } from '@mui/material';


export default function Cas() {
  const [counter, setCounter] = useState(1);
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Grid container spacing={2} width="35%">
        <Grid item xs={12}>
          <Typography textAlign={"center"}>{counter}</Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" fullWidth onClick={() => { setCounter(counter * 2) }}>Increment</Button>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" fullWidth onClick={() => { if (counter > 1) { setCounter(counter / 2) } }}>Decrement</Button>
        </Grid>
      </Grid></Box>
  );
}

