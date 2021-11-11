import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ListaKerkesave from "../ListaKerkesave";

export default observer(function DashboardKerkesa() {
  const { kerkesaStore } = useStore();
  const {loadKerkesat, kerkesaRegistry} = kerkesaStore;

  useEffect(() => {
    if(kerkesaRegistry.size <= 1) loadKerkesat();
  }, [kerkesaRegistry.size, loadKerkesat]);

  if (kerkesaStore.loadingInitial)
    return <LoadingComponent content="Loading.." />;

  return (     
    <Grid>
      <Grid.Column width="16">
        <ListaKerkesave />
      </Grid.Column>
    </Grid>
  );
});
