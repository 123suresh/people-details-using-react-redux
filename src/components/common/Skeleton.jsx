import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export default function SkeletonColor() {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
      }}
    >
      <Skeleton
        sx={{ bgcolor: "grey.500" }}
        variant="rectangular"
        width={1262}
        height={118}
      />
    </Box>
  );
}
