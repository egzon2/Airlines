// import { format } from "date-fns";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Menu, Table } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import NavBar from "../punetoret/NavBar";

export default observer(function ListaRezervimeve() {
  const { rezervimiStore } = useStore();
  const { deleteRezervimi, rezervimetByDate, loading } = rezervimiStore;

  const [target, setTarget] = useState("");

  function handleRezervimiDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteRezervimi(id);
  }

  return (
    <>
      <NavBar />
      <div style={{ marginTop: "120px" }}>
        <Menu
          attached="top"
          compact
          
          widths={8}
          style={{ margin: "5px",backgroundColor:"grey"}}
        >
          <Menu.Item as="a" style={{textTransform:"uppercase",color:"white"}}>Id </Menu.Item>
          <Menu.Item as="a" style={{textTransform:"uppercase",color:"white"}}>Vendi nisjes</Menu.Item>
          <Menu.Item as="a" style={{textTransform:"uppercase",color:"white"}}>Destinacioni</Menu.Item>
          <Menu.Item as="a" style={{textTransform:"uppercase",color:"white"}}> Kodi i sigurise</Menu.Item>
          <Menu.Item as="a" style={{textTransform:"uppercase",color:"white"}}>Numri i karteles</Menu.Item>
          <Menu.Item as="a" style={{textTransform:"uppercase",color:"white"}}>Data nisjes</Menu.Item>
          <Menu.Item as="a" style={{textTransform:"uppercase",color:"white"}}>Data kthimit</Menu.Item>
          <Menu.Item as="a" style={{textTransform:"uppercase",color:"white"}}>Operacione</Menu.Item>
        </Menu>
      </div>
      {rezervimetByDate.map((rezervimi) => (
        <Table attached  celled selectable>
          <Table.Body widths={4} >
            <Table.Row >
              <Table.Cell style={{width:"12.45%"}}>{rezervimi.udhetariId}</Table.Cell>
              <Table.Cell style={{width:"12.3%"}}>{rezervimi.vendi_Nisjes}</Table.Cell>
              <Table.Cell style={{width:"12.5%"}}>{rezervimi.vendi_Mberritjes}</Table.Cell>
              <Table.Cell style={{width:"12.45%"}}>{rezervimi.securityCode}</Table.Cell>
              <Table.Cell style={{width:"12.5%"}}>{rezervimi.cardNumber}</Table.Cell>
              <Table.Cell style={{width:"12.5%"}}>
                {format(rezervimi.departure!, "dd MMM yyyy h:mm aa")}
              </Table.Cell>
              <Table.Cell style={{width:"12.5%"}}>
                {format(rezervimi.return!, "dd MMM yyyy h:mm aa")}
              </Table.Cell>
              <Table.Cell>
                <Button
                  size="tiny"
                  name={rezervimi.id}
                  loading={loading && target === rezervimi.id}
                  onClick={(e) => handleRezervimiDelete(e, rezervimi.id)}
                  content="FSHIJ"
                  color="blue"
                    style={{marginLeft:"19%"}}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      ))}
    </>
  );
});
