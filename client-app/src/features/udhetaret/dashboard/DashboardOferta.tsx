import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ListaOfertave from "../ListaOfertave";

export default observer(function DashboardOferta() {
  const { ofertaStore } = useStore();
  const {loadOfertat, ofertaRegistry} = ofertaStore;

  useEffect(() => {
    if(ofertaRegistry.size <= 1) loadOfertat();
  }, [ofertaRegistry.size, loadOfertat]);

  if (ofertaStore.loadingInitial)
    return <LoadingComponent content="Loading.." />;

  return (     
    <Grid>
      <Grid.Column width="10">
        <ListaOfertave />
      </Grid.Column>
      <Grid.Column width="10">
      </Grid.Column>
    </Grid>
  );
});
