import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import NavBar from "../../punetoret/NavBar";

export default observer(function OfertaList() {
  const { ofertaStore } = useStore();
  const { deleteOferta, ofertatByDate, loading } = ofertaStore;

  const [target, setTarget] = useState("");

  function handleOfertaDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteOferta(id);
  }

  return (      
  <>
  <NavBar/>
  <div style={{marginTop:"120px"}}>
    <Segment style={{backgroundColor:"darkslategray", marginTop:"40px"}}>
      <Item.Group divided>
      <h3 style={{textAlign:"center",color:"white",marginBottom:"30px",fontSize:"25px",textTransform:"uppercase"}}>Ofertat</h3>
        {ofertatByDate.map((oferta) => (
           <Item key={oferta.id}>
            <Item.Content style={{margin:"20px",borderLeft:"4px solid pink",padding:"30px",borderRight:"2px solid orange",borderBottom:"2px solid orange",borderTop:"2px solid pink"}}>
              <Item.Header style={{color:"white",textTransform:"Uppercase",marginBottom:"20px"}}
            >
              Vendi i Nisjes :{oferta.goingTo}</Item.Header>
              <Item.Meta style={{color:"white",textTransform:"Uppercase",fontSize:"17px",marginBottom:"20px",paddingTop:"10px",borderTop:"1px solid pink"}}>Nisja : {format(oferta.checkIn!,'dd MMM yyyy h:mm aa')}</Item.Meta>
              <Item.Meta style={{color:"white",textTransform:"Uppercase",fontSize:"17px",marginBottom:"20px",paddingTop:"10px",borderTop:"1px solid yellow"}}>Kthimi : {format(oferta.checkOut!,'dd MMM yyyy h:mm aa')}</Item.Meta>
              <Item.Header style={{color:"white",textTransform:"Uppercase",fontSize:"17px",marginBottom:"20px",paddingTop:"10px",borderTop:"1px solid orange",width:"100%"}}>Klasa e fluturimit :{oferta.flightclass}</Item.Header>
              <br/>
              <Item.Header style={{color:"white",textTransform:"Uppercase",fontSize:"17px",marginBottom:"20px",paddingTop:"10px",borderTop:"1px solid grey",width:"100%"}}>Persona :{oferta.persons}</Item.Header>
              <br/>
              <Item.Header style={{color:"white",textTransform:"Uppercase",fontSize:"17px",marginBottom:"20px",paddingTop:"10px",paddingBottom:"10px",borderTop:"1px solid white",width:"100%",borderBottom:"1px solid white"}}>Cmimi :{oferta.cmimi}</Item.Header>
              <Item.Extra>
                <Button
                  as={Link}
                  to={`/ofertat/${oferta.id}`}
                  floated="right"
                  content="SHIKO"
                  color="blue"
                />
                
                <Button
                  name={oferta.id}
                  loading={loading && target === oferta.id}
                  onClick={(e) => handleOfertaDelete(e, oferta.id)}
                  floated="right"
                  content="FSHIJ"
                  color="pink"
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
