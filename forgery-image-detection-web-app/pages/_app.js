import "@/styles/globals.css";
import ResponsiveAppBar from "@/components/nav";
import { SessionProvider } from "next-auth/react";
import { createTheme, ThemeProvider } from "@mui/material";
import Footer from "@/components/footer";

export const theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          modalTitle: "p",
        },
      },
    },
    ModalBox: {
      styleOverrides: {
        root: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          bgcolor: "background.paper",
          padding: 4,
          borderRadius: 5,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 22,
          width: "6.8em",
          height: "34px",
          textTransform: "none",
          fontWeight: "bold",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          margin: "0px 50px 8px 50px",
          borderRadius: "8px",
          "&.Mui-expanded": {
            margin: "0px 50px 8px 50px",
          },
        },
      },
    },
  },
  palette: {
    secondary: {
      main: "#f79321",
      // light: "#f9ab53",
      // dark: "#dd7a08",
      contrastText: "#fff",
    },
    success: {
      main: "#25A599",
      // light: "#2fd0c0",
      // dark: "#1c7d73",
      contrastText: "#fff",
    },
    deleteIcon: {
      main: "#E60000",
    },
    deleteButton: {
      main: "#FF0000",
      // light: "#ff3333",
      // dark: "#cc0000",
      contrastText: "#fff",
    },
    cancelButton: {
      main: "#101010",
    },
    modalTitle: {
      main: "#f79421",
    },
  },
  typography: {
    modalTitle: {
      color: "#f79421",
      fontFamily: "Arial",
      fontSize: "18px",
      fontWeight: "bold",
    },
    h4: {
      fontFamily: "Arial",
      fontSize: "16px",
    },
    label: {
      font: "normal normal bold 16px/18px Arial",
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <SessionProvider session={pageProps.session}>
          <ResponsiveAppBar />
          <Component {...pageProps} />
          <Footer />
        </SessionProvider>
      </ThemeProvider>
    </div>
  );
}
