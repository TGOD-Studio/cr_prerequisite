import "@mantine/core/styles.css";
import {
  MantineProvider,
  createTheme,
  DEFAULT_THEME,
  mergeMantineTheme,
} from "@mantine/core";
import "./styles/main.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NothingFoundPage from "./pages/NothingFoundPage";

const theme = mergeMantineTheme(DEFAULT_THEME, createTheme({}));
const App = () => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NothingFoundPage />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
};

export default App;
