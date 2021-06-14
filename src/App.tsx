import { Provider } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import DateFnsAdapter from "@material-ui/pickers/adapter/date-fns";

import theme from "./config/theme";
import { store } from "./redux";
import ServerManagerProvider from "./components/ServerManagerProvider";
import PublicRoute from "./components/Routes/PublicRoute";
import PrivateRoute from "./components/Routes/PrivateRoute";
import { LocalizationProvider } from "@material-ui/pickers";

import { SignIn, Paths } from "./pages";
import Layout from "./components/Layout";

function App() {
  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter}>
      <Provider store={store}>
        <ServerManagerProvider>
          <ThemeProvider theme={theme}>
            <>
              <CssBaseline />
              <BrowserRouter>
                <Switch>
                  <PublicRoute component={SignIn} path={Paths.SignIn} />
                  <PrivateRoute component={Layout} />
                </Switch>
              </BrowserRouter>
            </>
          </ThemeProvider>
        </ServerManagerProvider>
      </Provider>
    </LocalizationProvider>
  );
}

export default App;
