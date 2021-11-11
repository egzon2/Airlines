import { observer } from "mobx-react-lite";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Container, Menu, Image, Dropdown } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default observer(function NavBar() {
  const {userStore: {user, logout}} = useStore();
  return (
    <Menu inverted fixed="top" style={{height:"60px"}}>
      <Container >
        {/* <Menu.Item as={NavLink} to="/" exact header style={{textTransform:"uppercase"}}>
          Home
        </Menu.Item> */}
        <div></div>
        <Menu.Item as={NavLink} to="/fluturimet" name="Fluturimet" style={{borderRadius:"5px",marginRight:"15px",width:"120px",height:"40px",backgroundColor:"#FFD700",fontFamily:"BR Cobane, sans-serif",fontWeight:"bold",paddingRight:"50px",paddingLeft:"25px",color:"white",marginTop:"10px"}}/>
        <Menu.Item as={NavLink} to="/punetoret" name="Punetoret" style={{borderRadius:"5px",fontFamily:"BR Cobane, sans-serif",fontWeight:"bold",color:"white",height:"40px",marginTop:"10px"}}/>
        <Menu.Item as={NavLink} to="/ofertat" name="Ofertat" style={{borderRadius:"5px",marginLeft:"15px",width:"120px",height:"40px",fontFamily:"BR Cobane, sans-serif",fontWeight:"bold",paddingRight:"50px",paddingLeft:"35px",color:"white",marginTop:"10px"}}/>
        <Menu.Item as={NavLink} to="/users" name="Users" style={{fontFamily:"BR Cobane, sans-serif",marginLeft:"40px",marginTop:"10px",textTransform:"",fontWeight:"bold",paddingRight:"40px",paddingLeft:"40px",backgroundColor:"rgba(65, 131, 215, 1)",borderRadius:"50px",height:"40px"}}/>
        <Menu.Item as={NavLink} to="/listarezervimeve" name="Rezervimet" style={{fontFamily:"BR Cobane, sans-serif",marginLeft:"40px",marginTop:"10px",fontWeight:"bold",paddingRight:"40px",paddingLeft:"40px",height:"40px"}}/>
        <Menu.Item as={NavLink} to="/listaKerkesave" name="Kerkesat" style={{backgroundColor:"#1b1c1d",borderRadius:"5px",marginLeft:"15px",width:"120px",height:"40px",fontFamily:"BR Cobane, sans-serif",fontWeight:"bold",paddingRight:"50px",paddingLeft:"2.5%",color:"white",marginTop:"10px"}}/>
        {/* <Menu.Item as={NavLink} to="/udhetari" name="Udhetari" style={{textTransform:"uppercase",fontWeight:"bold"}}/> */}
        {/* <Menu.Item as={NavLink} to="/errors" name="Errors" /> */}
        {/* <Menu.Item>
          <Button as={NavLink} to="/addPunetori" positive content="Shto punetorë" />
        </Menu.Item>
        <Menu.Item>
          <Button as={NavLink} to="/addFluturimi" positive content="Shto fluturim" />
        </Menu.Item> */}
        <Menu.Item position='right' style={{marginTop:"7px",marginRight:"-30px",backgroundColor:"rgb(40,237,142)", borderRadius:"40px",height:"45px",width:"130px"}}>
          <Image src={user?.image || '/assets/admin.png'} avatar spaced='right' style={{width:"35px",height:"35px"}}/>
          <Dropdown pointing='top right' text={user?.displayName} style={{fontFamily:"BR Cobane, sans-serif",color:"white"}}>
            <Dropdown.Menu style={{marginRight:"-20px"}}>
              <Dropdown.Item as={Link} to={`/profile/`} text='My profile' icon='user secret'/>
              <Dropdown.Item onClick={logout} text='Logout' icon='power'/>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
        <Menu.Item></Menu.Item>
        
      </Container>
    </Menu>
  );
})

