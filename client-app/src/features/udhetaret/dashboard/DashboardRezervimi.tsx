import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ListaRezervimeve from "../ListaRezervimeve";

export default observer(function DashboardRezervimi() {
  const { rezervimiStore } = useStore();
  const {loadRezervimet, rezervimiRegistry} = rezervimiStore;

  useEffect(() => {
    if(rezervimiRegistry.size <= 1) loadRezervimet();
  }, [rezervimiRegistry.size, loadRezervimet]);

  if (rezervimiStore.loadingInitial)
    return <LoadingComponent content="Loading.." />;

  return (     
    <Grid>
      <Grid.Column width="16">
        <ListaRezervimeve />
      </Grid.Column>
    </Grid>
  );
});
