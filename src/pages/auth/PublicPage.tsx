import { Grid } from "@mui/material";
import { memo } from "react";
import { Outlet } from "react-router-dom";
const PublicPage = () => {
  return (
    <Grid width={1} height={1}>
      <Outlet />
    </Grid>
  );
};

export default memo(PublicPage);
