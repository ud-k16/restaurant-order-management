import { Stack } from "expo-router";
import AppHeader from "../src/components/header";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        header: () => <AppHeader />,
      }}
    />
  );
}
