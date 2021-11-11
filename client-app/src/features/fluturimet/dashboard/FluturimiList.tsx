import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import NavBar from "../../punetoret/NavBar";

export default observer(function FluturimiList() {
  const { fluturimiStore } = useStore();
  const { deleteFluturimi, fluturimetByDate, loading } = fluturimiStore;

  const [target, setTarget] = useState("");

  function handleFluturimiDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteFluturimi(id);
  }

  return (      
  <>
  <NavBar/>
  <div style={{marginTop:"120px"}}>
    <Segment style={{backgroundColor:"#D8BFD8", marginTop:"40px"}}>
      <Item.Group divided>
      <h3 style={{paddingTop:"10px",textAlign:"center",color:"solid grey",marginBottom:"30px",fontSize:"25px",textTransform:"uppercase"}}>LISTA E FLUTURIMEVE</h3>
        {fluturimetByDate.map((fluturimi) => (
           <Item key={fluturimi.id}>
            <Item.Content style={{margin:"20px",borderLeft:"4px solid grey",padding:"30px",borderRight:"2px solid orange",borderBottom:"2px solid orange",borderTop:"3px solid grey"}}>
              <Item.Header style={{color:"black",textTransform:"Uppercase",marginBottom:"20px"}}>Vendi i Nisjes :{fluturimi.vendiNisjes}</Item.Header>
              <Item.Extra as="a" style={{color:"black",textTransform:"Uppercase",fontSize:"17px",marginBottom:"15px",paddingTop:"10px",borderTop:"2px solid purple"}}>destinacioni: {fluturimi.vendiMberritjes}</Item.Extra>
              <Item.Meta style={{color:"black",textTransform:"Uppercase",fontSize:"17px",marginBottom:"20px",paddingTop:"10px",paddingBottom:"10px",borderTop:"2px solid purple",borderBottom:"2px solid purple"}}>DATA E FLUTURIMIT : {format(fluturimi.date!,'dd MMM yyyy h:mm aa')}</Item.Meta>
              <Item.Extra>
                <Button
                  as={Link}
                  to={`/fluturimet/${fluturimi.id}`}
                  floated="right"
                  content="SHIKO"
                  color="purple"
                />
                
                <Button
                  name={fluturimi.id}
                  loading={loading && target === fluturimi.id}
                  onClick={(e) => handleFluturimiDelete(e, fluturimi.id)}
                  floated="right"
                  content="FSHIJ"
                  color="orange"
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
