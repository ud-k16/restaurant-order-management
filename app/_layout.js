import { Stack } from "expo-router";
import AppHeader from "../src/components/header";
import OrderContextProvider from "../src/context/useOrderContext";

export default function RootLayout() {
  return (
    <OrderContextProvider>
      <Stack
        screenOptions={{
          header: () => <AppHeader />,
        }}
      />
    </OrderContextProvider>
  );
}
