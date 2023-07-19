import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function LoadingLayout() {
  return (
    <Box
      sx={{
        bgcolor: "#121212",
        p: 8,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Skeleton
        sx={{ bgcolor: "grey.900", borderRadius: "8px" }}
        variant="rectangular"
        width={210}
        height={118}
      />
    </Box>
  );
}
