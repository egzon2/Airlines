import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button } from 'semantic-ui-react';
import * as Yup from 'yup';
import { useStore } from '../../../app/stores/store';
import MyTextInput from '../../../app/common/form/MyTextInput';
import ValidationErrors from '../../errors/ValidationErrors';

export default observer (function RegisterFormUdhetari() {
    const {udhetariStore} = useStore();
    return (
        <>
        <Formik
            initialValues={{displayName:'', username:'',email:'', password: '', error: null}}
            onSubmit={(values, {setErrors}) => udhetariStore.register(values).catch(error => 
                setErrors({error}))}
                validationSchema={Yup.object({
                    displayName: Yup.string().required(),
                    username: Yup.string().required(),
                    email: Yup.string().required().email(),
                    password: Yup.string().required(),
                    emri: Yup.string().required(),
                    mbiemri: Yup.string().required(),
                    birthday:Yup.string().required()
                })}
        >
            {({handleSubmit, isSubmitting, errors, isValid,dirty}) =>(
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off' style={{height:"200px",padding:"10px"}}>
                    <h2 style={{textAlign:"center",color:"#28bdb1",marginBottom:"30px",fontFamily:"arial"}}>Create Account</h2>
                    <h4>Name:</h4>
                    <MyTextInput name='displayName' placeholder='Diellza..' />
                    <h4>Username:</h4>
                    <MyTextInput name='username' placeholder='diellze..'/>
                    <h4>Email:</h4>
                    <MyTextInput name='email' placeholder='example@net.com..'/>
                    <h4>Name:</h4>
                    <MyTextInput name='emri' placeholder='diellza..'/>
                    <h4>Surname:</h4>
                    <MyTextInput name='mbiemri' placeholder='kosumi..'/>
                    <h4>Date of birth:</h4>
                    <MyTextInput name='birthday' placeholder='2020/..'/>
                    <h4>Password:</h4>
                    <MyTextInput name='password' placeholder='password..' type='password'/>
                    <ErrorMessage
                        name='error' render={() => 
                        <ValidationErrors errors={errors.error}/>}
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content='Sign up' type='submit' fluid
                    style={{borderRadius:"20px"}}/>
                    <h5>Already have an account? Login instead. </h5>
                    
                    <h6 style={{float:"left"}}>Copyright<img src="/assets/copy.png" width="13" height="10" alt="copyright logo"/>2021 All rights reserved.</h6>
                    
                </Form>
            )}
        </Formik>
        </>
    )
})