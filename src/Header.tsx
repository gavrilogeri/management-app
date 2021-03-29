import { AppBar, Grid, Toolbar, Paper, Badge } from '@material-ui/core';
import React, { LegacyRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useStyles from './AppStyle';
import PeopleIcon from '@material-ui/icons/People';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import customTheme from './CustomTheme';
import Tooltip from '@material-ui/core/Tooltip';
import { WeatherPopup } from './Weather'
import { geolocated } from 'react-geolocated';

const Header: React.FC = () => {



    const classes = useStyles();

    return (

        <AppBar position="static" style={{ background: customTheme.palette.secondary.light }}>
            <Toolbar>
                <Grid className={classes.headerStyle} container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                    spacing={5}
                >
                    <Grid item xs={12} md={4} className={classes.logo}>
                        <h1> MANAGEMENT APP </h1>
                    </Grid>
                    <Grid item xs={12} md={2} >
                        <NavLink className={classes.navLink} activeClassName={classes.aktivniLink} exact to="/">
                            <Badge style={{ paddingRight: "6px" }}><PeopleIcon /></Badge>Users
                        </NavLink>
                    </Grid>
                    <Grid item xs={12} md={2}  >
                        <NavLink className={classes.navLink} activeClassName={classes.aktivniLink} to="/companies">
                            <Badge style={{ paddingRight: "6px" }}><LocationCityIcon /></Badge>Companies
                        </NavLink>
                    </Grid>
                    <Grid item xs={12} md={2}  >
                        <NavLink className={classes.navLink} activeClassName={classes.aktivniLink} to="/newsletter">
                            <Badge style={{ paddingRight: "6px" }}><MenuBookIcon /></Badge>Newsletter
                        </NavLink>
                    </Grid>
                    <Grid item xs={12} md={2} >
                        <Tooltip title={<WeatherPopup />}>
                            <div>WEATHER FORECAST</div>
                        </Tooltip>

                    </Grid>
                </Grid>

            </Toolbar >
        </AppBar >
    )
}

export default Header;
