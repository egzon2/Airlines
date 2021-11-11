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
import { categoryOpts, categoryPersona, categoryStars } from "../../../app/common/options/categoryOptions";
import { Oferta } from "../../../app/models/oferta";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MySelectInput from "../../punetoret/form/MySelectInput";

export default observer(function OfertaForm() {                           
  const history = useHistory();

  const {ofertaStore} = useStore();
  const { addOferta, updateOferta, loading, loadOferta,loadingInitial } = ofertaStore;
  const {id} = useParams<{id: string}>();
  
  const [oferta, setOferta] = useState<Oferta>({
    id: '',
    goingTo:'',
    checkIn: null,
    checkOut: null,
    flightclass:'',
    cmimi:'',
    persons:''
  })

  const validationSchema = Yup.object({
    goingTo: Yup.string().required('Vendi aktual i nevojitur!'),
    checkIn: Yup.string().required('Vendi i mberritjes i nevojitur!'),
    checkOut: Yup.string().required('Vendi i mberritjes i nevojitur!'),
    flightclass: Yup.string().required('Klasa e fluturimit required!'),
    cmimi: Yup.string().required('Cmimi i nevojitur!'),
    persons: Yup.string().required('Numri i personave i nevojitur')
  })

  useEffect(() =>{
    if(id) loadOferta(id).then(oferta => setOferta(oferta!))
  }, [id, loadOferta]); //dependency 
  


  function handleFormSubmit(oferta: Oferta) {
      if(oferta.id.length === 0){ 
        let newOferta = {
          ...oferta,
          id:uuid()
        };
        addOferta(newOferta).then(() => history.push(`/ofertat/${newOferta.id}`))
      } else{
        updateOferta(oferta).then(() => history.push(`/ofertat/${oferta.id}`))
      }
      }


  if(loadingInitial) return <LoadingComponent content='Loading ofertat...'/>

  return (
    <>
    <div style={{marginTop:"60px",width:"1000px",marginLeft:"65px",}}>
    <h1 style={{textAlign:"center",textTransform:"uppercase",border:"1px solid grey",borderRadius:"5px",backgroundColor:"grey",color:"white",padding:"20px",marginBottom:"50px"}}>Oferta-Detajet</h1>
    <Segment clearing style={{backgroundColor:"grey"}}>
      <Formik
      validationSchema={validationSchema} 
      enableReinitialize 
      initialValues={oferta} 
      onSubmit={values => handleFormSubmit(values)}>
        {({ handleSubmit, isValid, isSubmitting, dirty}) => (
            <Form className='ui form' onSubmit={handleSubmit} autoComplete="off" >
                <h4 style={{textTransform:"uppercase",fontFamily:"sans-serif",color:"white"}}>Destinacioni: </h4>
                <MySelectInput options={categoryOpts}placeholder="Destinacioni.." name="goingTo"/>

                <h4 style={{textTransform:"uppercase",fontFamily:"sans-serif",color:"white"}}>Data e nisjes:</h4>
                <MyDateInput placeholderText='Zgjedh daten'  name='checkIn' showTimeSelect timeCaption='time' dateFormat='MMMM d, yyyy h:mm aa' />
                

                <h4 style={{textTransform:"uppercase",fontFamily:"sans-serif",color:"white"}}>Data e kthimit:</h4>
                <MyDateInput placeholderText='Zgjedh daten'  name='checkOut' showTimeSelect timeCaption='time' dateFormat='MMMM d, yyyy h:mm aa' />
                
                <h4 style={{textTransform:"uppercase",fontFamily:"sans-serif",color:"white"}}>Klasa e fluturimit:</h4>
                <MySelectInput options={categoryStars} placeholder="Destinacioni.." name='flightclass'/>

                <h4 style={{textTransform:"uppercase",fontFamily:"sans-serif",color:"white"}}>Numri i personave:</h4>
                <MySelectInput options={categoryPersona} placeholder="1.." name="persons"/>

                <h4 style={{textTransform:"uppercase",fontFamily:"sans-serif",color:"white"}}>Cmimi:</h4>
                <MyTextInput name='cmimi' placeholder='10..'/>

                <Button 
                disabled={isSubmitting || !dirty || !isValid}
                loading={loading} floated="right"  positive type="submit" content="SHTO"/>
                <Button as={Link} to ='/ofertat' floated="right" type="button" content="ANULO" color="pink"/>
            </Form>
        )}
      </Formik>
      
    </Segment>
    </div>
    </>
  );
})
