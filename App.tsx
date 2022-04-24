import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { COLOR_ACCENT, COLOR_PRIMARY } from "./AppStyles";
import { initializeApp, getApps } from "firebase/app";
import { EntryStackScreen } from "./screens/EntryStackScreen";
import HomePage from "./screens/RootStack/HomePage"
import RoomateStatus from "./screens/RootStack/RoomateStatus";

const firebaseConfig = require("./keys.json");

if (getApps().length == 0) {
  initializeApp(firebaseConfig);
}


const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: COLOR_PRIMARY,
    accent: COLOR_ACCENT,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <HomePage/>
      </PaperProvider>
    </SafeAreaProvider>
  );
}