import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import {  Menu, Table } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import NavBar from "../punetoret/NavBar";

export default observer(function ListaKerkesave() {
  const { kerkesaStore } = useStore();
  const { kerkesatByDate, loading } = kerkesaStore;

  const [target, setTarget] = useState("");

//   function handleKerkesaDelete(
//     e: SyntheticEvent<HTMLButtonElement>,
//     id: string
//   ) {
//     setTarget(e.currentTarget.name);
//     deleteKerkesa(id);
//   }

  return (
    <>
      <NavBar />
      <div style={{ marginTop: "120px" }}>
        <Menu
          attached="top"
          compact
          
          widths={6}
          style={{ margin: "5px",backgroundColor:"#57798c"}}
        >
          <Menu.Item as="a" style={{textTransform:"uppercase",color:"white"}}>Id </Menu.Item>
          <Menu.Item as="a" style={{textTransform:"uppercase",color:"white"}}>Subjekti </Menu.Item>
          <Menu.Item as="a" style={{textTransform:"uppercase",color:"white"}}>Pershkrimi</Menu.Item>
          <Menu.Item as="a" style={{textTransform:"uppercase",color:"white"}}>Vendi i nisjes</Menu.Item>
          <Menu.Item as="a" style={{textTransform:"uppercase",color:"white"}}>Destinacioni i kerkuar</Menu.Item>
          <Menu.Item as="a" style={{textTransform:"uppercase",color:"white"}}>Data e formulimit</Menu.Item>
        </Menu>
      </div>
      {kerkesatByDate.map((kerkesa) => (
        <Table attached  celled selectable>
          <Table.Body widths={4} >
            <Table.Row >
              <Table.Cell style={{width:"12.45%"}}>{kerkesa.udhetariId}</Table.Cell>
              <Table.Cell style={{width:"12.45%"}}>{kerkesa.titulli}</Table.Cell>
              <Table.Cell style={{width:"12.3%"}}>{kerkesa.description}</Table.Cell>
              <Table.Cell style={{width:"12.5%"}}>{kerkesa.vendi_Nisjes}</Table.Cell>
              <Table.Cell style={{width:"12.45%"}}>{kerkesa.destinacioni}</Table.Cell>
              <Table.Cell style={{width:"12.5%"}}>
                {format(kerkesa.date!, "dd MMM yyyy h:mm aa")}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      ))}
    </>
  );
});
