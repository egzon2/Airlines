import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import FluturimiList from "./FluturimiList";

export default observer(function FluturimiDashboard() {
  const { fluturimiStore } = useStore();
  const {loadFluturimet, fluturimiRegistry} = fluturimiStore;

  useEffect(() => {
    if(fluturimiRegistry.size <= 1) loadFluturimet();
  }, [fluturimiRegistry.size, loadFluturimet]);

  if (fluturimiStore.loadingInitial)
    return <LoadingComponent content="Loading Fluturimet.." />;

  return (
    
     <div
       style={{
         backgroundImage: `url("https://images.all-free-download.com/images/graphiclarge/people_at_airport_design_in_colored_style_6826054.jpg")`,
         backgroundPosition: "center",
         backgroundRepeat: "no-repeat",
         backgroundSize: "cover",
         backgroundAttachment: "fixed",
         marginTop: -50,
       }}
     > 
    <Grid style={{marginLeft:"160px",width:"1300px"}}>
      <Grid.Column width="10">
        <FluturimiList />
      </Grid.Column>
      <Grid.Column width="5">
      </Grid.Column>
    </Grid>
    </div>
  );
});
