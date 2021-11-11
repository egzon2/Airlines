import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { format } from "date-fns";

export default observer(function DetajetRezervimi() {
  const { rezervimiStore } = useStore();
  const {
    selectedRezervimi: rezervimi,
    loadRezervimi,
    loadingInitial,
  } = rezervimiStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadRezervimi(id);
  }, [id, loadRezervimi]);

  if (loadingInitial || !rezervimi) return <LoadingComponent />;

  return (
    <>
      <h1
        style={{
          marginTop:"3%",
          textAlign: "center",
          color: "grey",
          backgroundColor: "white",
          padding: "20px",
          textTransform: "uppercase",
        }}
      >
        Rezervimi juaj
      </h1>
      <Card fluid>
        <Card.Content
          style={{
            backgroundColor: "whitesmoke",
            padding: "12px 8px 12px 40px",
            margin: "40px",
            background: "#eee",
            fontSize: "15px",
          }}
        >
          <Card.Header
            style={{
              textTransform: "uppercase",
              borderBottom: "1px solid black",
            }}
          >
            {" "}
            Vendi i nisjes: {rezervimi.vendi_Nisjes}
          </Card.Header>
          <br />
          <Card.Header
            style={{
              textTransform: "uppercase",
              borderBottom: "1px solid black",
            }}
          >
            {" "}
            Vendi i mberritjes: {rezervimi.vendi_Mberritjes}
          </Card.Header>
          <br />
          <Card.Meta
            style={{
              textTransform: "uppercase",
              fontSize: "19px",
              color: "red",
              fontWeight: "bold",
            }}
          >
            Nisja behet me daten:{" "}
            {format(rezervimi.departure!, "dd MMM yyyy h:mm aa")}
          </Card.Meta>
          <br />
          <Card.Meta
            style={{
              textTransform: "uppercase",
              color: "red",
              fontSize: "19px",
              borderBottom: "1px solid black",
              fontWeight: "bold",
            }}
          >
            Kthimi behet me daten:{" "}
            {format(rezervimi.return!, "dd MMM yyyy h:mm aa")}
          </Card.Meta>
          <br />
          <Card.Header
            style={{
              textTransform: "uppercase",
              borderBottom: "1px solid black",
            }}
          >
            {" "}
            Numri i llogarise bankare: {rezervimi.cardNumber}
          </Card.Header>
          <br />
          <Card.Header
            style={{
              textTransform: "uppercase",
              borderBottom: "1px solid black",
            }}
          >
            {" "}
            Kodi i sigurise: {rezervimi.securityCode}
          </Card.Header>
          <br/>
          <Card.Header
            style={{
              textTransform: "uppercase",
              borderBottom: "1px solid black",
            }}
          >
            {" "}
            Zip Kodi: {rezervimi.zipCode}
          </Card.Header>
          <br />
          <Card.Header
            style={{
              textTransform: "uppercase",
              borderBottom: "1px solid black",
            }}
          >
            {" "}
            Id personale: {rezervimi.udhetariId}
          </Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Button
            as={Link}
            to={`/menaxhoR/${rezervimi.id}`}
            color="green"
            content="MODIFIKO"
            basic
            style={{ width: "20%", float: "right" }}
          />
          <Button
            as={Link}
            to="/rezervimet"
            color="pink"
            content="ANULO"
            basic
            style={{ width: "20%", float: "right" }}
          />
        </Card.Content>
      </Card>
    </>
  );
});
