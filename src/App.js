import React from "react";
import Header from "./containers/Header";
import MainContent from "./containers/MainContent";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
const dark = {
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        color: "#D3D3D3",
        background: `#282C34 !important`
      }
    },
    MuiTooltip: {
      popper: {
        opacity: 0.95
      },
      tooltip: {
        boxShadow: `0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)`,
        color: "#D3D3D3",
        opacity: 0.95,
        background: `#282C34 !important`
      }
    },
    MuiButton: {
      text: {
        text: {
          color: "#D3D3D3",
          background: `#282C34 !important`
        }
      }
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        color: "#D3D3D3",
        background: `#282C34 !important`
      },
      iconButton: {
        color: "#D3D3D3",
        background: `#282C34 !important`
      }
    },

    MuiPickersModal: {
      dialogAction: {
        color: "#D3D3D3",
        background: `#282C34 !important`
      }
    },
    MuiDrawer: {
      paper: {
        color: "#D3D3D3",
        background: `#282C34 !important`
      }
    },
    MuiDialog: {
      paper: {
        color: "#D3D3D3",
        background: `#282C34 !important`
      }
    },
    MuiPopover: {
      paper: {
        background: `#282C34 !important`
      }
    },
    MuiAppBar: {
      root: {
        color: "#D3D3D3",
        background: "#282C34"
      }
    }
  },
  palette: {
    background: { default: "#282C34" },
    primary: {
      main: "#e53935",
      contrastText: "#fff"
    },
    text: {
      primary: "#D3D3D3",
      secondary: "#D3D3D3"
    },
    secondary: {
      main: "#ff9100",
      contrastText: "#D3D3D3"
    },
    type: "dark"
  }
};
const light = {
  overrides: {
    MuiDrawer: {
      paper: {
        color: "black",
        background: "#fff !important"
      }
    },
    MuiAppBar: {
      root: {
        color: "#fff",
        background: "#e53935"
      }
    }
  },
  palette: {
    background: { default: "#fff" },
    type: "light",
    primary: {
      main: "#e53935",
      contrastText: "#fff"
    },
    secondary: {
      main: "#ff9100",
      contrastText: "#fff"
    }
  }
};
function App() {
  const [menu, toggleMenu] = React.useState(false);
  const [theme, setTheme] = React.useState(light);
  const changeTheme = () => {
    setTheme(theme === light ? dark : light);
  };

  const handleMenuClose = () => toggleMenu(!menu);
  const muiTheme = createMuiTheme(theme);

  return (
    <Provider store={store}>
      <div
        className="App"
        style={{ width: "100%", minHeight: "100%", height: "100%" }}
      >
        <Router>
          <MuiThemeProvider theme={muiTheme}>
            <Header
              openMenu={handleMenuClose}
              changeTheme={changeTheme}
            ></Header>

            <MainContent menu={menu} closeMenu={handleMenuClose}></MainContent>
          </MuiThemeProvider>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
