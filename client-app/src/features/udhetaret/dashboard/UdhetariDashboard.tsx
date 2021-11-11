import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import UdhetaretList from "../UdhetaretList";

export default observer(function UdhetariDashboard() {
  const { udhetariStore } = useStore();
  const {loadUdhetaret, udhetariRegistry} = udhetariStore;

  useEffect(() => {
    if(udhetariRegistry.size <= 1) loadUdhetaret();
  }, [udhetariRegistry.size, loadUdhetaret]);

  if (udhetariStore.loadingInitial)
    return <LoadingComponent content="Loading.." />;

  return (
     
    <Grid >
      <Grid.Column width="15">
        <UdhetaretList />
      </Grid.Column>
    </Grid>
  );
});
