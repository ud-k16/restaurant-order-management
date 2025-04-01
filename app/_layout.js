import { Stack } from "expo-router";
import AppHeader from "../src/components/header";
import OrderContextProvider from "../src/context/useOrderContext";
import HeaderContextProvider from "../src/context/useHeaderContext";
import WifiContextProvider from "../src/context/useWifiContext";
import CustomerContextProvider from "../src/context/useCustomerContext";
import ErrorContextProvider from "../src/context/useErrorContext";
import HomeContextProvider from "../src/context/useHomeContext";

export default function RootLayout() {
  return (
    <ErrorContextProvider>
      <WifiContextProvider>
        <HeaderContextProvider>
          <OrderContextProvider>
            <CustomerContextProvider>
              <HomeContextProvider>
                <Stack
                  screenOptions={{
                    header: () => <AppHeader />,
                  }}
                />
              </HomeContextProvider>
            </CustomerContextProvider>
          </OrderContextProvider>
        </HeaderContextProvider>
      </WifiContextProvider>
    </ErrorContextProvider>
  );
}
