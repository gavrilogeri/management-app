import { makeStyles } from "@material-ui/core/styles";
import { white } from "material-ui/styles/colors";
import { Link } from "react-router-dom";
import customTheme from "./CustomTheme";

export default makeStyles((customTheme) => ({
  //stil u headeru

  headerStyle: {
    fontSize: "13px",
    color: "white",
    textAlign: "center",
  },

  headerTab: {
    textAlign: "center",
  },

  navLink: {
    background: "#266867",
    padding: "10px",
    fontSize: "18px",
    color: "#fff",
    textDecoration: "none",
    display: "flex",
    borderRadius: "5px",
    // -webkit-box-shadow: 4px 4px 16px 1px rgba(0,0,0,0.78);
    boxShadow: "4px 4px 16px 1px rgba(0,0,0,0.78)",
    // boxSizing: "border-box"
    justifyContent: "center",
    "&:hover": {
      background: "#348a88",
      transition: "all 0.2s ease-in",
    },
  },

  aktivniLink: {
    background: "#1a4645",
    boxShadow: "inset 18px 23px 26px -17px rgba(0,0,0,0.64)",
    "&:hover": {
      background: "#1a4645",
      transition: "all 0.2s ease-in",
    },
  },

  logo: {
    textAlign: "left",
    color: "#266867",
    fontWeight: "bold",
  },
}));
