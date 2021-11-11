import { observer } from "mobx-react-lite";
import { userInfo } from "os";
import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
// import udhetariStore from "../../app/stores/udhetariStore";
import LoginFormUdhetari from "../udhetaret/form/LoginFormUdhetari";
import RegisterFormUdhetari from "../udhetaret/form/RegisterFormUdhetari";
// import LoginFormUdhetari from '../udhetaret/form/LoginFormUdhetari';
import LoginForm from "../users/LoginForm";
// import RegisterForm from "../users/RegisterForm";

export default observer(function HomePage() {
  const { userStore, modalStore, udhetariStore } = useStore();
  return (
    <>
      <div
        style={{
          marginTop: "0",
          backgroundColor: "#28282a",
          height: "65px",
          display: "flex",
          fontWeight: 700,
          justifyContent: "flex-end",
        }}
       >
         <p
          style={{
            color: "white",
            fontSize: "20px",
            textTransform: "uppercase",
            fontFamily: "Roboto Condensed,sans-serif",
            margin: "20px 34% 75px 100px",
          }}
        >
          oneair
        </p>

        {udhetariStore.isLoggedIn ? (
          <>
            <Header as="h2" content="Welcome to Airlines" />
          </>
        ) : (
          <>
            <Button
              onClick={() => modalStore.openModal(<LoginFormUdhetari />)}
              size="huge"
              style={{
                color: "white",
                backgroundColor: "#28282a",
                textTransform: "uppercase",
                fontFamily: "Roboto Condensed, sans-serif",
                fontSize: "14px",
                marginRight: "-15px",
              }}
            >
              Sign In
            </Button>
            <Button
              onClick={() => modalStore.openModal(<RegisterFormUdhetari />)}
              size="huge"
              style={{
                color: "#ff3366",
                backgroundColor: "#28282a",
                textTransform: "uppercase",
                fontFamily: "Roboto Condensed, sans-serif",
                fontSize: "14px",
              }}
            >
              Sign Up
            </Button>
          </>
        )}
      </div>

      <Segment
        style={{
          paddingBottom: "0em",
          paddingTop: "2em",
          paddingRight: "0em",
          paddingLeft: "0em",
        }}
      >
        <div style={{ marginTop: "-29px" }}>
          <Image
            size="massive"
            src="/assets/air.png"
            alt="logo"
            style={{
              width: "100%",
              // marginLeft: "-20px",
              marginTop: "-43px",
              // height:"700px"
            }}
          />
        </div>
        <Container text style={{ marginTop: "-50%" }}>
          {userStore.isLoggedIn ? (
            <>
              <Header as="h2" content="Welcome to Airlines" />
              <Button as={Link} to="/punetoret" size="huge" inverted style={{}}>
                You may go on
              </Button>
            </>
          ) : (
            <>
              <p
                style={{
                  color: "white",
                  fontSize: "40px",
                  textTransform: "uppercase",
                  fontFamily: "Roboto Condensed, sans-serif",
                  marginTop: "-30%",
                  paddingBottom: "8%",
                  letterSpacing: "-1.5px",
                  textAlign: "center",
                  fontWeight: 700,
                }}
              >
                Upgrade your flights
              </p>
              <span
                style={{
                  width: "10%",
                  height: "4px",
                  margin: "8px auto 0",
                  display: "block",
                  backgroundColor: "#ff3366",
                  marginTop: "-12%",
                }}
              ></span>

              <p
                style={{
                  color: "white",
                  fontSize: "20px",
                  fontFamily: "Work sans,sans-serif",
                  paddingBottom: "4.5%",
                  marginLeft: "7%",
                  marginTop: "8%",
                }}
              >
                Enjoy secret offers up to -70% off the best luxury hotels every
                Sunday.
              </p>

              <Button
                onClick={() => modalStore.openModal(<LoginForm />)}
                size="huge"
                style={{
                  color: "white",
                  backgroundColor: "#FF3366",
                  width: "28%",
                  borderRadius: "0px",
                  height: "55px",
                  fontFamily: "Roboto Condensed, sans-serif",
                  fontSize: "13px",
                  marginLeft: "37%",
                  marginTop: "-10%",
                  letterSpacing: "1px",
                }}
              >
                ADMIN
              </Button>
              <h3
                style={{
                  color: "white",
                  marginLeft: "40.5%",
                  fontSize: "13px",
                  fontFamily: "work sans,sans-serif",
                  marginTop:"13px"
                }}
              >
                Discover the experience
              </h3>

              {/* <div
                style={{
                  backgroundColor: "rgba(192,192,192,0.3)",
                  width: "146%",
                  height: "140px",
                  marginLeft: "-24%",
                  marginTop: "2.56%",
                }}
              >
                <p
                  style={{
                    fontWeight: "bolder",
                    color: "orange",
                    marginLeft: "100px",
                  }}
                >
                  About us
                </p>
              </div> */}
            </>
          )}
        </Container>
      </Segment>
    </>
  );
});
