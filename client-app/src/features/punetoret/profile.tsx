import React from "react";
import { NavLink } from "react-router-dom";
import { Button  } from "semantic-ui-react";
import NavBar from "./NavBar";
import { useStore } from "../../app/stores/store";
// import FluturimiForm from "../fluturimet/form/FluturimiForm";
// import PunetoriForm from "./form/PunetoriForm";
import { observer } from "mobx-react-lite";

export default observer(function Profile() {
  const {
    userStore: { user },
  } = useStore();

  // style={{textAlign:"center",color:"white",backgroundColor:"#c159cf", padding:"25px",textTransform:"uppercase"}}
  return (
    <>
    <NavBar />
      <h1
        style={{
          textTransform: "uppercase",
          marginTop: "80px",
          textAlign: "left",
          padding: "20px",
          border: "1px solid gray",
          backgroundColor: "lightgrey",
        }}
      >
        Te dhena personale
      </h1>
      <table className="ui celled table">
        <thead>
          <tr>
            <th style={{ width: "200px", height: "30px" }}>
              Emri: {user?.displayName}
            </th>
            <th>Username : {user?.username}</th>
            <th >Email : {user?.email}</th>
          </tr>
        </thead>
      </table>

      <div>
        <img
          src="/assets/pilot.png"
          style={{ width: "200px", height: "200px", marginLeft: "923px" }}
          alt="Pilot picture"
        />
      </div>

      <div className="ui massive vertical menu" style={{ marginTop: "-200px" }}>
        <div
          className="ui button"
          data-inverted=""
          data-tooltip="Platforma jone online e mundesuar nga Airlines-Company.Shtoni, modifikoni apo fshini te dhena ne baze te nevojes. Per cdo paqartesi drejtohuni ne numrat tone kontaktues!"
          data-position="right center"
          style={{ backgroundColor: "#59f7f7", fontSize: "17px" }}
        >
          Reminder---
        </div>
        <a className="item">
          <div className="ui small label">1</div>
          <Button
            as={NavLink}
            to="/addPunetori"
            style={{
              backgroundColor: "#28ed8e",
              color: "white",
              borderRadius: "7px",
            }}
          >
            Shto punetore
          </Button>
        </a>
        <a className="item">
          <div className="ui small label">1</div>
          <Button
            as={NavLink}
            to="/addFluturimi"
            style={{
              backgroundColor: "#28ed8e",
              color: "white",
              borderRadius: "7px",
            }}
          >
            Shto Fluturime
          </Button>
        </a>
        <a className="item">
          <div className="ui small label">1</div>
          <Button
            as={NavLink}
            to="/addOferta"
            style={{
              backgroundColor: "#28ed8e",
              color: "white",
              borderRadius: "7px",
            }}
          >
            Regjistro Oferta
          </Button>
        </a>
      </div>

      <div
        className="ui two column grid"
        style={{ float: "right", marginTop: "-213px" }}
      >
        <div className="column">
          <div className="ui raised segment">
            <a className="ui orange ribbon label">Overview</a>
            <span>Account Details</span>
            <p>
              Temporarily impossible to edit your account information but we are
              working on it to bring it to you sooner!
            </p>
          </div>
        </div>
      </div>

      <div
        className="ui category search"
        style={{ float: "right", marginTop: "-400px", marginRight: "20px" }}
      >
        <div className="ui icon input">
          <input className="prompt" type="text" placeholder="Search..." />
          <i className="search icon"></i>
        </div>
        <div className="results"></div>
      </div>
      
    </>
  );
});
