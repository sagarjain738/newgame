// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";
import { Button } from "./Button";

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    brand: {
      100: "#ff3c00",
    },
  },
  fonts: {
    body: "Open Sans, sans-serif",
  },
  styles: {
    global: () => ({
      body: {
        // bg: "gray.200",
        bg: "white",
      },
    }),
  },
  components: {
    Button,
  },
});
