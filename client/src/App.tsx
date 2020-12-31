import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Home from "./components/Home";
import "./App.css";

const theme = extendTheme({
    styles: {
        global: {
            body: {
                bg: "#f6f6f1"
            }
        }
    }
});

const App = () => {
    return (
        <ChakraProvider theme={theme}>
            <Home />
        </ChakraProvider>
    );
};

export default App;
