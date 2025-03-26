import { Stack } from "expo-router";
import AppHeader from "../src/components/header";
import OrderContextProvider from "../src/context/useOrderContext";
import HeaderContextProvider from "../src/context/useHeaderContext";

export default function RootLayout() {
  return (
    <HeaderContextProvider>
      <OrderContextProvider>
        <Stack
          screenOptions={{
            header: () => <AppHeader />,
          }}
        />
      </OrderContextProvider>
    </HeaderContextProvider>
  );
}
