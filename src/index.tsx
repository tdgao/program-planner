import { CssVarsProvider, extendTheme } from "@mui/joy";
import React from "react";
import ReactDOM from "react-dom/client";
import { ProgramPlanner } from "./coursePlanner/ProgramPlanner";
import reportWebVitals from "./reportWebVitals";

const theme = extendTheme({
  components: {
    JoyTypography: {
      defaultProps: {
        levelMapping: {
          display1: "h1",
          display2: "h1",
          h1: "h1",
          h2: "h1",
          h3: "h1",
          h4: "h2",
          h5: "h3",
          h6: "h4",
          body1: "p",
          body2: "span",
          body3: "span",
          body4: "span",
          body5: "span",
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CssVarsProvider theme={theme}>
      <ProgramPlanner />
    </CssVarsProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
