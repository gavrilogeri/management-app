import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import UsersPage from './Components/Users/UsersPage';
import CompaniesPage from "./Components/Companies/CompaniesPage";
import NewsletterPage from './Components/Newsletter/NewsletterPage';
import { makeStyles, withStyles } from '@material-ui/core';

import { createStyles, ThemeProvider } from '@material-ui/core/styles';
import Header from './Header';
import customTheme from './CustomTheme';

// STILOVI ZA DIV CONTAINER
// const useStyles = makeStyles(customTheme => createStyles({

// ))


const App: React.FC = () => {
  // const classes = useStyles();

  return (
    <div>
      <ThemeProvider theme={customTheme}>

        <BrowserRouter>
          <Header />
          {/* ovde je bio tag <switch> */}
          <Route path="/" exact component={UsersPage} />
          <Route path="/companies" exact component={CompaniesPage} />
          <Route path="/newsletter" exact component={NewsletterPage} />

        </BrowserRouter>
        {/* <UsersPage /> */}

      </ThemeProvider>
    </div>
  );
}

export default App;
