import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ListaFluturimeve from "../ListaFluturimeve";
// import UdhetaretList from "../UdhetaretList";

export default observer(function ListaFluturimeveDashboard() {
  const { fluturimiStore } = useStore();
  const {loadFluturimet, fluturimiRegistry} = fluturimiStore;

  useEffect(() => {
    if(fluturimiRegistry.size <= 1) loadFluturimet();
  }, [fluturimiRegistry.size, loadFluturimet]);

  if (fluturimiStore.loadingInitial)
    return <LoadingComponent content="Loading.." />;

  return (
     
    <Grid style={{marginLeft:"160px",width:"1300px"}}>
      <Grid.Column width="10">
        <ListaFluturimeve />
      </Grid.Column>
      <Grid.Column width="5">
      </Grid.Column>
    </Grid>
  );
});
