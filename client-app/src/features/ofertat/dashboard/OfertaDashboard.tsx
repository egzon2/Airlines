import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import OfertaList from "./OfertaList";

export default observer(function OfertaDashboard() {
  const { ofertaStore } = useStore();
  const { loadOfertat, ofertaRegistry } = ofertaStore;

  useEffect(() => {
    if (ofertaRegistry.size <= 1) loadOfertat();
  }, [ofertaRegistry.size, loadOfertat]);

  if (ofertaStore.loadingInitial)
    return <LoadingComponent content="Loading Ofertat.." />;

  return (
    <Grid style={{marginLeft:"160px",width:"1300px"}}>
      <Grid.Column width="10">
        <OfertaList />
      </Grid.Column>
      <Grid.Column width="5">
      </Grid.Column>
    </Grid>
  );
});
