import { Badge } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";

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
