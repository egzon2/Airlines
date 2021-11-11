import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
// import Popper from "../../home/Popper";
import PunetoriList from "./PunetoriList";

export default observer(function PunetoriDashboard() {
  const { punetoriStore } = useStore();
  const {loadPunetoret, punetoriRegistry} = punetoriStore;

  useEffect(() => {
    if(punetoriRegistry.size <= 1) loadPunetoret();
  }, [punetoriRegistry.size, loadPunetoret]);

  if (punetoriStore.loadingInitial)
    return <LoadingComponent content="Loading..." />;

  return (
     <div
       style={{
         backgroundImage: `url("https://img.freepik.com/free-vector/pilots-airplane-cockpit-jet-with-control-panel_33099-2238.jpg?size=626&ext=jpg")`,
         backgroundPosition: "center",
         backgroundRepeat: "no-repeat",
         backgroundSize: "cover",
         backgroundAttachment: "fixed",
         marginTop: -50,
       }}
     > 
     
    <Grid style={{marginLeft:"185px",width:"1200px"}}>
      <Grid.Column width="10">
        <PunetoriList />
      </Grid.Column>
      <Grid.Column width="5">
      </Grid.Column>
    </Grid></div>
  );
});
