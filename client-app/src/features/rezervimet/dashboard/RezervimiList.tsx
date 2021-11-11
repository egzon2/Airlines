import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Message, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function RezervimiList() {
  const { rezervimiStore } = useStore();
  const { rezervimetByDate, loading,deleteRezervimi } = rezervimiStore;


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
      <Message
        attached="top"
        content="Ne faqen e ofertave ndodhet opsioni per te rezervuar bileta. Anulimi/fshirja e biletes nuk eshte e mundur!"
        icon="info circle sign"
        color="violet"
        warning
        style={{ marginTop:"10%",width:"100%" }}
      />
      <div style={{ marginTop: "120px" }}>
        <Segment
          style={{
            backgroundColor: "white",
            marginTop: "-15%",
            border: "2px solid pink",
          }}
        >
          <Item.Group divided>
            <h3
              style={{
                paddingTop: "10px",
                textAlign: "center",
                color: "black",
                marginBottom: "30px",
                fontSize: "23px",
                textTransform: "uppercase",
              }}
            >
              Rezervimet personale te regjistruara
            </h3>
            {rezervimetByDate.map((rezervimi) => (
              <Item key={rezervimi.id}>
                <Item.Content
                  style={{
                    margin: "20px",
                    borderLeft: "3px solid grey",
                    padding: "30px",
                    borderRight: "2px solid grey",
                    borderBottom: "2px solid grey",
                    borderTop: "2px solid grey",
                  }}
                >
                  <Item.Header style={{ color: "black", marginBottom: "20px" }}>
                    Vendi i nisjes: {rezervimi.vendi_Nisjes}
                  </Item.Header>
                  <br />
                  <Item.Extra
                    as="a"
                    style={{
                      color: "black",
                      fontSize: "17px",
                      marginBottom: "15px",
                      paddingTop: "10px",
                      borderTop: "1px solid grey",
                    }}
                  >
                    Destinacioni: {rezervimi.vendi_Mberritjes}
                  </Item.Extra>
                  <Item.Meta
                    style={{
                      color: "black",
                      fontSize: "17px",
                      marginBottom: "20px",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      borderTop: "1px solid grey",
                      borderBottom: "1px solid grey",
                    }}
                  >
                    Data e nisjes:{" "}
                    {format(rezervimi.departure!, "dd MMM yyyy h:mm aa")}
                  </Item.Meta>
                  <Item.Meta
                    style={{
                      color: "black",
                      fontSize: "17px",
                      marginBottom: "20px",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      borderBottom: "1px solid grey",
                    }}
                  >
                    Data e kthimit:{" "}
                    {format(rezervimi.return!, "dd MMM yyyy h:mm aa")}
                  </Item.Meta>
                  <Item.Extra
                    as="a"
                    style={{
                      color: "black",
                      textTransform: "Uppercase",
                      fontSize: "17px",
                      marginBottom: "15px",
                      paddingTop: "10px",
                    }}
                  >
                    Numri i karteles bankare: {rezervimi.cardNumber}
                  </Item.Extra>
                  <Item.Meta
                    style={{
                      color: "black",
                      fontSize: "17px",
                      marginBottom: "5px",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      borderTop: "1px solid grey",
                    }}
                  >
                    {" "}
                    Kodi i sigurise: {rezervimi.securityCode}
                  </Item.Meta>
                  <Item.Meta
                    style={{
                      color: "black",
                      fontSize: "17px",
                      marginBottom: "5px",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      borderTop: "1px solid grey",
                    }}
                  >
                    {" "}
                    ZipKodi: {rezervimi.zipCode}
                  </Item.Meta>
                  <Item.Meta
                    style={{
                      color: "black",
                      fontSize: "17px",
                      marginBottom: "5px",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      borderTop: "1px solid grey",
                      borderBottom: "1px solid grey",
                    }}
                  >
                    {" "}
                    Id personale: {rezervimi.udhetariId}
                  </Item.Meta>
                  <Item.Extra>
                    <Button
                      as={Link}
                      to={`/rezervimet/${rezervimi.id}`}
                      floated="right"
                      content="SHIKO"
                      color="green"
                      basic
                    />
                    <Button
                  size="tiny"
                  name={rezervimi.id}
                  loading={loading && target === rezervimi.id}
                  onClick={(e) => handleRezervimiDelete(e, rezervimi.id)}
                  content="FSHIJ"
                  color="red"
                  basic
                    style={{marginLeft:"65%"}}
                />
                    {/* <Button
                      as={Link}
                      to={`/menaxhoR/${rezervimi.id}`}
                      color="blue"
                      content="MODIFIKO"
                      basic
                      style={{marginLeft:"57%"}}
                    /> */}
                  </Item.Extra>
                </Item.Content>
              </Item>
            ))}
          </Item.Group>
        </Segment>
      </div>
    </>
  );
});
