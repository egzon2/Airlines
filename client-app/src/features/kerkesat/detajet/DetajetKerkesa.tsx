import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import NavBar from "../../punetoret/NavBar";

export default observer(function DetajetKerkesa() {
  const { kerkesaStore } = useStore();
  const { selectedKerkesa: kerkesa, loadKerkesa, loadingInitial } = kerkesaStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadKerkesa(id);
  }, [id, loadKerkesa]);

  if (loadingInitial || !kerkesa) return <LoadingComponent />;

  return (
    <>
    <div style={{width:"700px",marginLeft:"200px",marginTop:"100px", }}>
    <h1 style={{textAlign:"left",color:"black",backgroundColor:"white", padding:"25px"}}>Kerkesa</h1>
    <Card fluid style={{backgroundColor:'white'}}>
      <Card.Content style={{backgroundColor:'whitesmoke', padding: '12px 8px 12px 40px',margin:'40px',background: '#eee',fontSize: '15px',borderLeft:'3px solid grey',
      
    }}>
        <Card.Header style={{textTransform:'uppercase',borderBottom:"1px solid black",padding:"10px"}}>Titulli: {kerkesa.titulli}</Card.Header>
        <br/>
        {/* <hr/> */}
        <Card.Meta style={{textTransform:'uppercase',color:"black",fontSize:"17px",borderBottom:"1px solid black",padding:"5px"}}>Pershkrimi: {kerkesa.description}</Card.Meta>
        <br/>
        <Card.Meta style={{textTransform:'uppercase',borderBottom:"1px solid black",fontSize:"17px",color:"black",padding:"5px"}}>Vendi i nisjes {kerkesa.vendi_Nisjes}</Card.Meta>
        <br/>
        <Card.Meta style={{textTransform:'uppercase',borderBottom:"1px solid black",fontSize:"17px",color:"black",padding:"5px"}}>Vendi i nisjes {kerkesa.destinacioni}</Card.Meta>
        <br/>
        <Card.Meta style={{textTransform:'uppercase',borderBottom:"1px solid black",fontSize:"17px",color:"black",padding:"5px"}}>Data e formulimit te kerkeses: {kerkesa.udhetariId!}</Card.Meta>
        <br/>
        <Card.Meta style={{textTransform:'uppercase',fontSize:"17px",color:"black",padding:"5px"}}>Data e formulimit te kerkeses: {format(kerkesa.date!, 'dd MMM yyyy h:mm aa')}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          {/* <Button
            as={Link}
            to={`/manageKerkesa/${kerkesa.id}`} 
            color="blue" basic
            content="MODIFIKO"
          /> */}
          <Button as={Link} to="/UdhetariProfile" color="blue" content="Kthehu prapa" basic/>
        </Button.Group>
      </Card.Content>
    </Card>
    </div>
    </>
  );
});
