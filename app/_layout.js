import { Stack } from "expo-router";
import AppHeader from "../src/components/header";
import OrderContextProvider from "../src/context/useOrderContext";
import HeaderContextProvider from "../src/context/useHeaderContext";
import SocketContextProvider from "../src/context/useSocketContext";
import WifiContextProvider from "../src/context/useWifiContext";

export default function RootLayout() {
  return (
    <WifiContextProvider>
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
    </WifiContextProvider>
  );
}
