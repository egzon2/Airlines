import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Message, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
// import MySelectInput from "./MySelectInput";
import {
  categoryOpsions,
  categoryOpts,
} from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Rezervimi } from "../../../app/models/rezervimi";
import MySelectInput from "../../punetoret/form/MySelectInput";
import UdhetariNavBar from "../../udhetaret/UdhetariNavBar";

export default observer(function RezervimiForm() {
  const history = useHistory();

  const { rezervimiStore } = useStore();
  const {
    addRezervimi,
    updateRezervimi,
    loading,
    loadRezervimi,
    loadingInitial,
  } = rezervimiStore;
  const { id } = useParams<{ id: string }>();

  const [rezervimi, setRezervimi] = useState<Rezervimi>({
    id: "",
    vendi_Nisjes: "",
    vendi_Mberritjes: "",
    departure: null,
    return: null,
    cardNumber: "",
    securityCode: "",
    zipCode: "",
    udhetariId: "",
  });

  const validationSchema = Yup.object({
    vendi_Nisjes: Yup.string().required("Vendi i nevojitur!"),
    vendi_Mberritjes: Yup.string().required("Vendi i nevojitur!"),
    departure: Yup.string().required("Data e nisjes e nevojitur!").nullable(),
    return: Yup.string().required("Data e kthimit e nevojitur!").nullable(),
    cardNumber: Yup.string().required("Numri i karteles i nevojitur!"),
    securityCode: Yup.string().required("Numri i sigurise i nevojitur!"),
    zipCode: Yup.string().required("Zip kodi i nevojitur!"),
    udhetariId: Yup.string().required("Id personale e nevojitur!"),
  });

  useEffect(() => {
    if (id) loadRezervimi(id).then((rezervimi) => setRezervimi(rezervimi!));
  }, [id, loadRezervimi]);

  function handleFormSubmit(rezervimi: Rezervimi) {
    if (rezervimi.id.length === 0) {
      let newRezervimi = {
        ...rezervimi,
        id: uuid(),
      };
      addRezervimi(newRezervimi).then(() =>
        history.push(`/rezervimet/${newRezervimi.id}`)
      );
    } else {
      updateRezervimi(rezervimi).then(() =>
        history.push(`/rezervimet/${rezervimi.id}`)
      );
    }
  }

  if (loadingInitial)
    return <LoadingComponent content="Rezervimet duke u ngarkuar..." />;

  return (
    <>
      <Message
        attached="top"
        content="VEMENDJE--Rezervimi i biletes se fluturimit nuk mund te fshihet dhe pagesa nuk kthehet! Ju lutem keni kujdes!"
        icon="warning sign"
        color="black"
        warning
        style={{ marginTop: "60px" }}
      />
      <Segment clearing style={{ marginTop: "5%" }}>
        <h1 style={{ marginBottom: "5%" }}>Informata Personale:</h1>
        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={rezervimi}
          onSubmit={(values) => handleFormSubmit(values)}
        >
          {({ handleSubmit, isValid, isSubmitting, dirty }) => (
            <Form
              className="ui form"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <h4>Vendi i nisjes:</h4>
              <MySelectInput
                options={categoryOpsions}
                placeholder="vendi i nisjes.."
                name="vendi_Nisjes"
              />
              {/* <MyTextInput name='vendi_Nisjes' placeholder='pristina..'/> */}
              <h4>Destinacioni:</h4>
              <MySelectInput
                options={categoryOpts}
                placeholder="destinacioni.."
                name="vendi_Mberritjes"
              />
              <h4>Data e nisjes:</h4>
              <MyDateInput
                placeholderText="zgjedh daten../"
                name="departure"
                showTimeSelect
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
              <h4>Data e mberritjes:</h4>
              <MyDateInput
                placeholderText="zgjedh daten../"
                name="return"
                showTimeSelect
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
              />

              <h4>Numri i xhirollogarise: </h4>
              <MyTextInput placeholder="12.." name="cardNumber" />

              <h4>Numri i sigurise: </h4>
              <MyTextInput placeholder="12.." name="securityCode" />

              <h4>Zip Kodi: </h4>
              <MyTextInput placeholder="1/2.." name="zipCode" />

              <h4>Id personale: </h4>
              <MyTextInput placeholder="1/2.." name="udhetariId" />

              <Button
                disabled={isSubmitting || !dirty || !isValid}
                loading={loading}
                floated="right"
                positive
                type="submit"
                content="SHTO"
              />
              <Button
                as={Link}
                to="/rezervimet"
                floated="right"
                type="button"
                content="ANULO"
                color="pink"
              />
            </Form>
          )}
        </Formik>
      </Segment>
    </>
  );
});
