import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import {format} from 'date-fns';
import NavBar from "../NavBar";

export default observer(function DetajetPunetori() {
  const { punetoriStore } = useStore();
  const { selectedPunetori: punetori, loadPunetori, loadingInitial } = punetoriStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadPunetori(id);
  }, [id, loadPunetori]);

  if (loadingInitial || !punetori) return <LoadingComponent />;



  return (
    <>
    <NavBar/>
    <div style={{width:"700px",marginTop:"100px",marginLeft:"215px"}}>
    <h1 style={{textAlign:"center",color:"white",backgroundColor:"rgba(190, 144, 212,1)", padding:"20px"}}>DETAJET E PUNETORIT</h1>
    <Card fluid style={{backgroundColor:'rgba(232, 236, 241, 1)'}}>
      <Card.Content style={{backgroundColor:'whitesmoke', padding: '12px 8px 12px 40px',margin:'40px',background: '#eee',fontSize: '15px',borderLeft:'4px solid green',
      borderBottom:"4px solid purple"
    }}>
        <Card.Header style={{textTransform:'uppercase',borderBottom:"1px solid black"}}> Aeroplani: {punetori.aeroplanId}</Card.Header>
        <br/>
        <Card.Meta style={{textTransform:'uppercase',color:"black",fontSize:"17px",borderBottom:"1px solid black"}}>Emri: {punetori.emri}</Card.Meta>
        <br/>
        <Card.Meta style={{color:'black', textTransform:'uppercase',fontSize:"17px",borderBottom:"1px solid black"}}>
          <span>Mbiemri: {punetori.mbiemri}</span>
        </Card.Meta>
        <br/>
        <Card.Meta style={{textTransform:'uppercase',fontSize:"17px",color:"black"}}>Data e fillimit te punes: {format(punetori.date!, 'dd MMM yyyy h:mm aa')}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            as={Link}
            to={`/manage/${punetori.id}`} 
            
            color="green"
            content="MODIFIKO"
          />
          <Button as={Link} to="/punetoret" color="blue" content="ANULO" />
        </Button.Group>
      </Card.Content>
    </Card>
    </div>
    </>
  );
});
