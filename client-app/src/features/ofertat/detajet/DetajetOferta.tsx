import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import NavBar from "../../punetoret/NavBar";

export default observer(function DetajetOferta() {
  const { ofertaStore } = useStore();
  const { selectedOferta: oferta, loadOferta, loadingInitial } = ofertaStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadOferta(id);
  }, [id, loadOferta]);

  if (loadingInitial || !oferta) return <LoadingComponent />;

  return (
    <>
    <NavBar/>
    <div style={{width:"700px",marginLeft:"200px"}}>
    <h1 style={{textAlign:"center",color:" white",backgroundColor:"#66CDAA", padding:"25px",marginTop:"100px",textTransform:'uppercase'}}>Oferta details</h1>
    <Card fluid style={{backgroundColor:'#66CDAA'}}>
      <Card.Content style={{backgroundColor:'#F5F5DC', padding: '12px 8px 12px 40px',margin:'40px',background: '#eee',fontSize: '15px',borderLeft:'3px solid grey',
      borderTop:'3px solid grey',borderBottom:'3px solid grey'
    }}>
        <Card.Header style={{textTransform:'uppercase',borderBottom:"1px solid black",textAlign:"center"}}> Vendi i nisjes: {oferta.goingTo}</Card.Header>
        <br/>
        <Card.Meta style={{textTransform:'uppercase',color:"black",fontSize:"17px",borderBottom:"1px solid black",textAlign:"center"}}>Nisja: {format(oferta.checkIn!, 'dd MMM yyyy h:mm aa')}</Card.Meta>
        <br/>
        <Card.Meta style={{textTransform:'uppercase',color:"black",fontSize:"17px",borderBottom:"1px solid black",textAlign:"center"}}>Destinacioni: {format(oferta.checkOut!, 'dd MMM yyyy h:mm aa')}</Card.Meta>
        <br/>
        <Card.Meta style={{textTransform:'uppercase',fontSize:"17px",color:"black",borderBottom:"1px solid black",textAlign:"center"}}>Klasa e fluturimit: {oferta.flightclass}</Card.Meta>
        <br/>
        <Card.Meta style={{textTransform:'uppercase',fontSize:"17px",color:"black",borderBottom:"1px solid black",textAlign:"center"}}>Cmimi: {oferta.cmimi}</Card.Meta>
        <br/>
        <Card.Meta style={{textTransform:'uppercase',fontSize:"17px",color:"black",borderBottom:"1px solid black",textAlign:"center"}}>Numri i personave: {oferta.persons}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            as={Link}
            to={`/menaxho/${oferta.id}`} 
            color="green"
            content="MODIFIKO"
          />
          <Button as={Link} to="/ofertat" color="pink" content="ANULO"/>
        </Button.Group>
      </Card.Content>
    </Card>
    </div>
    </>
  );
});
