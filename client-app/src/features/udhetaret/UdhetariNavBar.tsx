import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
// import { useStore } from '../../../app/stores/store';

export default observer(function UdhetariNavBar() {
  const {
    udhetariStore: { logoutUdhetari, isLoggedIn },
  } = useStore();

  return (
    <Sidebar.Pushable
      className="sideBarA"
      
    >
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        vertical
        visible
        width="wide"
        direction="left"
      >
        {/* {isLoggedIn ? ( */}
        <Menu.Item style={{}} as={NavLink} to="/udhetariProfile">
          <Icon name="user" />
          Profili
        </Menu.Item>
        {/* ) : null} */}
        <Menu.Item as={NavLink} to="/listaofertave">
          <Icon className="paper plane outline" />
          Ofertat
        </Menu.Item>
        <Menu.Item as={NavLink} to="/rezervimet">
          <Icon className="suitcase icon" />
          Rezervimet
        </Menu.Item>
        <Menu.Item as={NavLink} to="/addKerkesa">
          <Icon className="edit outline" />
          Kerkesat/formulo kerkese
        </Menu.Item>

        <Menu.Item as={NavLink} to="/listafluturimeve">
          <Icon className="plane" />
          Shiko Fluturimet
        </Menu.Item>

        <Menu.Item onClick={logoutUdhetari}>
          <Icon name="log out" />
          Dil
        </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher>
        <Segment basic style={{ height: "100vh" }}></Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
});
