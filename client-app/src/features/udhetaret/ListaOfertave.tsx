import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useStore } from "../../app/stores/store";
import { Button, Icon, Image } from "semantic-ui-react";
import { format } from "date-fns";
import { NavLink } from "react-router-dom";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      width: "60%",
      maxWidth: "65%",
      minHeight: 500,
      marginLeft: "9%",
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "10s0%",
      maxHeight: "100%",
    },
  })
);

export default function ListaOfertave() {
  const classes = useStyles();
  const { ofertaStore } = useStore();
  const { ofertatByDate } = ofertaStore;

  return (
    <>
      <Icon
        className="arrow alternate circle left icon"
        as={NavLink}
        to="/udhetariProfile"
        style={{
          marginTop: "-199%",
          marginLeft: "-57.6%",
          width: "270.9%",
          paddingLeft: "45%",
        }}
      >
        Go back to your profile
      </Icon>

      <div
        style={{
          backgroundColor: "white",
          height: "102%",
          width: "280%",
          marginLeft: "-60%",
          paddingRight: "-10%",
          // paddingTop:"3em"
        }}
      >
        <img
          src="/assets/sea.png"
          alt="logoooo"
          style={{
            width: "100.5%",
            backgroundSize: "cover",
            height: "20%",
            // marginTop: "-6.4%",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div
          className={classes.root}
          style={{
            backgroundColor: "white",
            width: "100%",
            marginLeft: "11.5%",
            marginTop: "900px",
            // marginBottom:"-700px"
          }}
        >
          <Paper elevation={5} className={classes.paper}>
            <Grid container spacing={2} style={{}}>
              <Grid item></Grid>
              {ofertatByDate.map((oferta) => (
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        Vendi: {oferta.goingTo}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Klasa: {oferta.flightclass}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Data e nisjes:
                        {format(oferta.checkIn!, "dd MMM yyyy h:mm aa")}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Data e mberritjes
                        {format(oferta.checkOut!, "dd MMM yyyy h:mm aa")}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Personat:{oferta.persons}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1">
                        Cmimi:{oferta.cmimi}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Button floated="right" content=" SALE" color="pink" />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </div>

        <div style={{ float: "left" }}>
          <div
            style={{
              backgroundColor: "#0770e3",
              width: "106%",
              height: "130px",
              marginTop: "-140%",
              marginLeft: "52%",
              marginRight: "50%",
              borderRadius: "10px",
            }}
          >
            <span
              style={{
                lineHeight: "1.5",
                fontSize: "30px",
                fontWeight: 700,
                color: "white",
                fontFamily: "sans-serif",
                marginLeft: "18.5%",
              }}
            >
              Travel gets easier
            </span>
            <p
              style={{ fontSize: "13px", color: "white", marginLeft: "190px" }}
            >
              Fully vaccinated? From 4 October you won't need a pre-departure
              test before returning from your country from a non-red country.
            </p>

            <img
              src="/assets/first.png"
              style={{
                height: "85%",
                width: "15%",
                marginTop: "-6.7%",
                borderRadius: "5px",
                paddingBottom: "8px",
                marginLeft: "10px",
              }}
              alt="First Class Airplane Ticket"
            />
            <Button
              floated="right"
              content="See the full update->"
              style={{
                marginRight: "66%",
                marginTop: "0",
                color: "white",
                backgroundColor: "#0770e3",
              }}
            />
          </div>
        </div>

        <div
          style={{
            backgroundColor: "whitesmoke",
            borderRadius: "10px",
            width: "51%",
            height: "10.5%",
            marginTop: "-56%",
            marginLeft: "24.5%",
          }}
        >
          <img
            src="/assets/map.png"
            style={{ width: "420px", height: "90%", marginLeft: "57.3%" }}
            alt="Picture of a map"
          />
          <div style={{ marginLeft: "30px", marginTop: "-25%", width: "35%" }}>
            <p style={{ fontWeight: 700, fontSize: "25px", color: "black" }}>
              Get the COVID-19 travel info you need
            </p>
            <p
              style={{
                fontWeight: 400,
                fontSize: "17px",
                color: "black",
                marginTop: "30px",
              }}
            >
              Navigate live travel entry restrictions and bans, including the
              latest info for UK travellers. And sign up to get updates when
              things change.
            </p>
            <Button
              floated="left"
              content="View live map ->"
              style={{
                color: "white",
                backgroundColor: "#00a698",
                marginTop: "-32%",
                width: "160px",
                height: "35px",
                paddingTop: "10px",
              }}
            />
          </div>
          <div style={{ marginLeft: "15%", marginTop: "-90%", color: "white" }}>
            <p style={{ fontSize: "47px", fontWeight: "bolder" }}>
              Let the journey begin
            </p>
            <p style={{ fontSize: "40px" }}>Book now.</p>
            <Button
              content="Make room for Zanzibar ->"
              style={{
                color: "white",
                backgroundColor: "purple",
                marginLeft: "-38%",
                marginTop: "8%",
              }}
            />
            <Button
              content="Click here to book a reservation-->"
              style={{
                color: "white",
                backgroundColor: "blue",
                marginLeft: "48%",
              }}
              as={NavLink} to="/addRezervimi"
            />
          </div>
        </div>
      </div>
      <div style={{ marginTop: "-235%"}}>
        <p style={{ color: "black", fontSize: "25px", fontWeight: "bold" }}>
          Plan your next Staycation
        </p>
        <Button
          basic
          color="blue"
          content="Zanzibar"
          style={{
            marginRight: "15px",
            color: "white",
            backgroundColor: "green",
            borderRadius: "25px",
          }}
        />
        <Button
          basic
          color="green"
          content="Edinburgh"
          style={{
            marginRight: "15px",
            backgroundColor: "blue",
            borderRadius: "25px",
          }}
        />
        <Button
          basic
          color="red"
          content="Bora-Bora"
          style={{
            marginRight: "15px",
            backgroundColor: "red",
            borderRadius: "25px",
          }}
        />
        <Button
          basic
          color="purple"
          content="Maldives"
          style={{
            marginRight: "15px",
            backgroundColor: "orange",
            borderRadius: "25px",
          }}
        />
        <Button
          basic
          color="yellow"
          content="Lithuania"
          style={{
            marginRight: "15px",
            backgroundColor: "purple",
            borderRadius: "25px",
          }}
        />
      </div>

      <div
        style={{
          marginTop: "95%",
          backgroundColor: "#f1f2f8",
          width: "265%",
          marginLeft: "-50%",
          height: "20%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <img
          src="/assets/firstpillar.png"
          alt=""
          style={{ width: "14%", height: "55%", marginTop: "3%" }}
        />
        <img
          src="/assets/secondpillar.png"
          alt=""
          style={{ width: "14%", height: "55%", marginTop: "3%" }}
        />
        <img
          src="/assets/thirdpillar.png"
          alt=""
          style={{ width: "14%", height: "55%", marginTop: "3%" }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <h3 style={{ marginTop: "-23%", marginLeft: "-19%",fontSize:"24px" }}>
          Ready when you are
        </h3>
        <h3 style={{ marginTop: "-23%", marginRight: "3%",fontSize:"24px" }}>
          Plan with confidence
        </h3>
        <h3 style={{ marginTop: "-23%", marginRight: "-75%",fontSize:"24px" }}>
          Keep it simple
        </h3>
      </div>
      <div style={{display:"flex",justifyContent:"space-around",textAlign:"center",color:"grey"}}>
        <p style={{ marginLeft: "-19%", marginTop: "-15%" }}>
          See where you can travel to right now
          <br />
           and find the best deals across
           <br />
          thousands of flights, hotels and car
          <br />
           hire options
        </p>
        <p style={{ marginLeft: "4%", marginTop: "-15%",color:"grey" }}>
          Stay one step ahead with flexible 
          <br />
          flight tickets, free hotel and car
          <br />
          cancellation and the cleanest 
          <br/> rooms around.
        </p>
        <p style={{ marginRight: "-81%", marginTop: "-15%",color:"grey" }}>
          No hidden fees. No hidden charges.
          <br />
           No funny business. With us, you’ll
           <br />
          always know exactly where your 
          <br />
          money goes. So you can relax before
          your 
          <br />
          trip even begins.
        </p>
        
      </div>
      <h6 style={{marginLeft:"145%",width:"30%"}}>Copyright<img src="/assets/copy.png" width="13" height="10"/>2021 All rights reserved.</h6>
    </>
  );
}
