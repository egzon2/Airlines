import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid, Message } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import RezervimiList from "./RezervimiList";

export default observer(function RezervimiDashboard() {
  const { rezervimiStore } = useStore();
  const { loadRezervimet, rezervimiRegistry } = rezervimiStore;

  useEffect(() => {
    if (rezervimiRegistry.size <= 1) loadRezervimet();
  }, [rezervimiRegistry.size, loadRezervimet]);

  if (rezervimiStore.loadingInitial)
    return <LoadingComponent content="Loading..." />;

  return (
    <>
      
      <Button
        content="Shiko ofertat"
        color="violet"
        as={NavLink}
        to="/ListaOfertave"
        style={{ marginLeft: "-7%", marginTop: "1%" }}
      />
      <Grid style={{ marginLeft: "185px", width: "1100px", marginTop: "-10%" }}>
        <Grid.Column width="10">
          <RezervimiList />
        </Grid.Column>
        <Grid.Column width="5"></Grid.Column>
      </Grid>
    </>
  );
});
