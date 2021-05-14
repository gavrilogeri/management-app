import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import CompaniesPage from "./Components/Companies/CompaniesPage";
import NewsletterPage from "./Components/Newsletter/NewsletterPage";
import UsersPage from "./Components/Users/UsersPage";
import customTheme from "./CustomTheme";
import Header from "./Header";

const App: React.FC = () => {
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
};

export default App;
