import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import NavBar from "../NavBar";
// import SegmentExm from "./SegmentExm";


export default observer(function PunetoriList() {
  const { punetoriStore } = useStore();
  const { deletePunetori, punetoretByDate, loading } = punetoriStore;

  const [target, setTarget] = useState("");

  function handlePunetoriDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deletePunetori(id);
  }

  return (      
  <>
  {/* <SegmentExm/> */}
  <NavBar/>
  <div style={{marginTop:"120px"}}>
    <Segment style={{backgroundColor:"#702963", marginTop:"40px",border:"2px solid pink"}}>
      <Item.Group divided>
      <h3 style={{paddingTop:"10px",textAlign:"center",color:"white",marginBottom:"30px",fontSize:"23px",textTransform:"uppercase"}}>Punetoret e regjistruar</h3>
        {punetoretByDate.map((punetori) => (
           <Item key={punetori.id}>
            <Item.Content style={{margin:"20px",borderLeft:"8px solid white",padding:"30px",borderRight:"2px solid white",borderBottom:"2px solid yellow",borderTop:"2px solid yellow"}}>
              <Item.Header style={{color:"white",textTransform:"Uppercase",marginBottom:"20px"}}>AEROPLANI NE LINJE :{punetori.aeroplanId}</Item.Header>
              <br/>
              <Item.Extra as="a" style={{color:"white",textTransform:"Uppercase",fontSize:"17px",marginBottom:"15px",paddingTop:"10px",borderTop:"1px solid white"}}>EMRI: {punetori.emri}</Item.Extra>
              <Item.Meta style={{color:"white",textTransform:"Uppercase",fontSize:"17px",marginBottom:"5px",paddingTop:"10px",paddingBottom:"10px",borderTop:"1px solid white"}}> MBIEMRI: {punetori.mbiemri}</Item.Meta>
              <Item.Meta style={{color:"white",textTransform:"Uppercase",fontSize:"17px",marginBottom:"20px",paddingTop:"10px",paddingBottom:"10px",borderTop:"1px solid white",borderBottom:"1px solid white"}}>DATA E FILLIMIT TE PUNES: {format(punetori.date!,'dd MMM yyyy h:mm aa')}</Item.Meta>
              <Item.Extra>
                <Button
                  as={Link}
                  to={`/punetoret/${punetori.id}`}
                  floated="right"
                  content="SHIKO"
                  color="blue"
                />
                
                <Button
                  name={punetori.id}
                  loading={loading && target === punetori.id}
                  onClick={(e) => handlePunetoriDelete(e, punetori.id)}
                  floated="right"
                  content="FSHIJ"
                  color="red"
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
      
    </Segment></div>
    </>
  );
});
