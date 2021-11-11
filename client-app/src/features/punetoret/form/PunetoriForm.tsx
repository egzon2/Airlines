import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MySelectInput from "./MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Punetori } from "../../../app/models/punetori";

export default observer(function PunetoriForm() {                           
  const history = useHistory();

  const {punetoriStore} = useStore();
  const { addPunetori, updatePunetori, loading, loadPunetori,loadingInitial } = punetoriStore;
  const {id} = useParams<{id: string}>();
  
  const [punetori, setPunetori] = useState<Punetori>({
    id: '',
    emri: '',
    mbiemri: '',
    date: null,
    aeroplanId:''
  })

  const validationSchema = Yup.object({
    emri: Yup.string().required('Emri i punetorit i nevojitur!'),
    mbiemri: Yup.string().required('Mbiemri i punetorit i nevojitur!'),
    date: Yup.string().required('Data e punesimit e nevojitur!').nullable(),
    aeroplanId: Yup.string().required('Id e Aeroplanit e nevojitur!')
  })

  useEffect(() =>{
    if(id) loadPunetori(id).then(punetori => setPunetori(punetori!))
  }, [id, loadPunetori]); //dependency 


  function handleFormSubmit(punetori: Punetori) {
      if(punetori.id.length === 0){ 
        let newPunetori = {
          ...punetori,
          id:uuid()
        };
        addPunetori(newPunetori).then(() => history.push(`/punetoret/${newPunetori.id}`))
      } else{
        updatePunetori(punetori).then(() => history.push(`/punetoret/${punetori.id}`))
      }
      }


  if(loadingInitial) return <LoadingComponent content='Punetoret duke u ngarkuar...'/>

  return (
    <>
    <div style={{marginTop:"50px",width:"900px",marginLeft:"120px"}}>
    <h1 style={{textAlign:"center",color:"white",backgroundColor:"rgba(148, 124, 176, 1)", padding:"25px",textTransform:"uppercase"}}>Detajet e punetorit</h1>
    <Segment clearing>
      <Formik
      validationSchema={validationSchema} 
      enableReinitialize 
      
      initialValues={punetori} 
      onSubmit={values => handleFormSubmit(values)}>
        {({ handleSubmit, isValid, isSubmitting, dirty}) => (
            <Form className='ui form' onSubmit={handleSubmit} autoComplete="off">
                <h4>Emri:</h4>
                <MyTextInput name='emri' placeholder='Emri..'/>
                <h4>Mbiemri:</h4>
                <MyTextInput placeholder="Mbiemri.." name='mbiemri'/>
                <h4>Data e fillimit te punes:</h4>
                <MyDateInput placeholderText='Zgjedh daten'  name='date' showTimeSelect timeCaption='time' dateFormat='MMMM d, yyyy h:mm aa' />
                <h4>Aeroplani: </h4>
                <MySelectInput options={categoryOptions} placeholder="Linja e Aeroplanit.." name="aeroplanId"  />
                <Button 
                disabled={isSubmitting || !dirty || !isValid}
                loading={loading} floated="right"  positive type="submit" content="SHTO"/>
                <Button as={Link} to ='/punetoret' floated="right" type="button" content="ANULO"  color="pink"/>
            </Form>
        )}
      </Formik>  
    </Segment>
    </div>
    </>
  );
})
