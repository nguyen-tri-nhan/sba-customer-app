import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useLoadedAssets } from "./hooks/useLoadedAssets";
import Navigation from "./navigation";
import { useColorScheme, LogBox } from "react-native";

export default function App() {
  const isLoadingComplete = useLoadedAssets();
  const colorScheme = useColorScheme();
  LogBox.ignoreLogs(['Warning: Cannot update a component (`PackageDetailsScreen`)']);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
