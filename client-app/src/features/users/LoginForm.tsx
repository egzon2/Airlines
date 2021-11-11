import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
// import react from 'react';
import { Button, Label } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';

export default observer (function LoginForm() {
    const {userStore} = useStore();
    return (
        <>
        <Formik 
            initialValues={{email:'', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.login(values).catch(error => 
                setErrors({error:'Invalid email or password'}))}
        >
            {({handleSubmit, isSubmitting, errors}) =>(
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' style={{height:"400px",padding:"15px"}}>
                    <h2 style={{textAlign:"center",color:"rgba(224, 130, 131, 1)",marginBottom:"30px",fontFamily:"arial"}}>Login</h2>
                    <h4>Email:</h4>
                    <MyTextInput name='email' placeholder='example@net.com'/>
                    <h4>Password:</h4>
                    <MyTextInput name='password' placeholder='password' type='password'/>
                    
                    <ErrorMessage
                        name='error' render={() => <Label style={{marginBottom:10}} basic color='red' content={errors.error}/>}
                    />
                    <Button loading={isSubmitting} positive content='Login' type='submit' fluid 
                    style={{borderRadius:"20px",backgroundColor:"rgba(241, 130, 141,1)",color:"white"}}/>
                    <h5 style={{textAlign:"center"}}>Follow us.</h5>
                    <div style={{display:"flex", justifyContent:"center"}}>
                    <a href="https://www.facebook.com" target="_blank" style={{paddingRight:"15px"}}>
                    <img src="/assets/fblogo.png"  width="22" height="22"  /></a>
                    <a href="https://www.twitter.com" target="_blank" style={{paddingRight:"15px"}}>
                    <img src="/assets/twitter.png"  width="22" height="22"/></a>
                    <a href="https://www.google.com" target="_blank">
                    <img src="/assets/google.png"  width="22" height="22"/></a>
                    </div>
                    <h6 style={{float:"left"}}>Copyright<img src="/assets/copy.png" width="13" height="10"/>2021 All rights reserved.</h6>
                </Form>
            )}
        </Formik>
        </>
    )
})