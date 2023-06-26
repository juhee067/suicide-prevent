import React from "react";
import Intro from "./pages/Intro";
import GlobalStyles from "./style/GlobalStyles";
import { ThemeProvider } from "styled-components";
import theme from "./style/Theme";

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Intro />
      </ThemeProvider>
    </div>
  );
}

export default App;
