// import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Menu, Table } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import NavBar from "../punetoret/NavBar";

export default observer(function UdhetaretList() {
  const { udhetariStore } = useStore();
  const { deleteUdhetarin, udhetaretByDate, loading } = udhetariStore;


  const [target, setTarget] = useState("");

  

  function handleUdhetariDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteUdhetarin(id);
  }

  return (
    <>
      <NavBar />
      <div style={{marginTop:"120px"}}>
      <Menu
        attached="top"
        compact
        inverted
        widths={7}
        style={{ margin: "5px"}}
      >
        <Menu.Item as="a">Id</Menu.Item>
        <Menu.Item as="a">Emri</Menu.Item>
        <Menu.Item as="a">Mbiemri</Menu.Item>
        <Menu.Item as="a">Ditelindja</Menu.Item>
        <Menu.Item as="a">Username</Menu.Item>
        <Menu.Item as="a">Email</Menu.Item>
        <Menu.Item as="a">Operacioni</Menu.Item>
      </Menu></div>
      {udhetaretByDate.map((udhetari) => (
        <Table attached inverted celled selectable>
          <Table.Body widths={7} >
            <Table.Row>
            <Table.Cell style={{width:"14.2%"}}>{udhetari.id}</Table.Cell>
              <Table.Cell style={{width:"14.2%"}}>{udhetari.emri}</Table.Cell>
              <Table.Cell style={{width:"14.2%"}}>{udhetari.mbiemri}</Table.Cell>
              <Table.Cell style={{width:"14.4%"}}>{udhetari.birthday}</Table.Cell>
              <Table.Cell style={{width:"14.4%"}}>{udhetari.userName}</Table.Cell>
              <Table.Cell style={{width:"14.2%"}}>{udhetari.email}</Table.Cell>
              <Table.Cell>
                <Button size="tiny"
                  name={udhetari.id}
                  loading={loading && target === udhetari.id}
                  onClick={(e) => handleUdhetariDelete(e, udhetari.id)}
                  content="FSHIJ"
                  color="purple"
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
