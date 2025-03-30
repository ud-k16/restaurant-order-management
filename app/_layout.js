import { Stack } from "expo-router";
import AppHeader from "../src/components/header";
import OrderContextProvider from "../src/context/useOrderContext";
import HeaderContextProvider from "../src/context/useHeaderContext";
import WifiContextProvider from "../src/context/useWifiContext";
import CustomerContextProvider from "../src/context/useCustomerContext";

export default function RootLayout() {
  return (
    <WifiContextProvider>
      <HeaderContextProvider>
        <OrderContextProvider>
          <CustomerContextProvider>
            <Stack
              screenOptions={{
                header: () => <AppHeader />,
              }}
            />
          </CustomerContextProvider>
        </OrderContextProvider>
      </HeaderContextProvider>
    </WifiContextProvider>
  );
}
