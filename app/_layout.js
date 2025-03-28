import { Stack } from "expo-router";
import AppHeader from "../src/components/header";
import OrderContextProvider from "../src/context/useOrderContext";
import HeaderContextProvider from "../src/context/useHeaderContext";
import SocketContextProvider from "../src/context/useSocketContext";

export default function RootLayout() {
  return (
    <SocketContextProvider>
      <HeaderContextProvider>
        <OrderContextProvider>
          <Stack
            screenOptions={{
              header: () => <AppHeader />,
            }}
          />
        </OrderContextProvider>
      </HeaderContextProvider>
    </SocketContextProvider>
  );
}
