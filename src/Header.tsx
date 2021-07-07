import { AppBar, Grid, Toolbar } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import PeopleIcon from "@material-ui/icons/People";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import React from "react";
import Coords from "./Coords";
import HeaderLink from "./HeaderLink";
import { motion } from "framer-motion";
import "./styles/appStyle.scss";
const Header: React.FC = () => {
  return (
    <motion.div
      initial={{ y: -150, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, opacity: { ease: "easeIn", duration: 1.5 } }}
    >
      <AppBar position="static" className="header">
        <Toolbar variant="dense">
          <Grid
            className="headerStyle"
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            spacing={5}
          >
            <Grid item xs={12} md={3} className="logo">
              <h1> MANAGEMENT APP </h1>
            </Grid>
            <Grid item xs={12} md={2}>
              <HeaderLink
                icon={<PeopleIcon fontSize="small" />}
                linkAddress="/"
                linkTitle="Users"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <HeaderLink
                icon={<LocationCityIcon fontSize="small" />}
                linkAddress="/companies"
                linkTitle="Companies"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <HeaderLink
                icon={<MenuBookIcon fontSize="small" />}
                linkAddress="/newsletter"
                linkTitle="Newsletter"
              />
            </Grid>
            <Grid item xs={12} md={1}>
              <HeaderLink
                icon={<AnnouncementIcon fontSize="small" />}
                linkAddress="/news"
                linkTitle="News"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Tooltip title={<Coords />}>
                <div className="weatherContainer">
                  <button className="weatherButton">
                    <BeachAccessIcon className="weatherIcon" fontSize="small" />
                  </button>
                </div>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

export default Header;
