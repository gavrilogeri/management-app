import React from "react";
import { Badge } from "@material-ui/core";
import { NavLink } from "react-router-dom";
// import useStyles from "./AppStyle";
import MenuBookIcon from "@material-ui/icons/MenuBook";

interface Props {
  linkAddress: string;
  linkTitle: string;
  icon: any;
}

const HeaderLink: React.FC<Props> = ({ linkAddress, linkTitle, icon }) => {
  return (
    <NavLink
      className="navLink"
      activeClassName="activeLink"
      exact
      to={linkAddress}
    >
      <Badge style={{ paddingRight: "6px" }}>{icon}</Badge>
      {linkTitle}
    </NavLink>
  );
};

export default HeaderLink;
