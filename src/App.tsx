import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import CompaniesPage from "./Components/Companies/CompaniesPage";
import NewsletterPage from "./Components/Newsletter/NewsletterPage";
import UsersPage from "./Components/Users/UsersPage";
import { StylesProvider } from "@material-ui/core/styles";
// import customTheme from "./CustomTheme";
import Header from "./Header";
import "./styles/appStyle.scss";
const App: React.FC = () => {
  return (
    <div>
      <StylesProvider injectFirst>
        <BrowserRouter>
          <Header />
          {/* ovde je bio tag <switch> */}
          <Route path="/" exact component={UsersPage} />
          <Route path="/companies" exact component={CompaniesPage} />
          <Route path="/newsletter" exact component={NewsletterPage} />
        </BrowserRouter>
        {/* <UsersPage /> */}
      </StylesProvider>
    </div>
  );
};

export default App;
