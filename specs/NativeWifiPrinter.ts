import type { TurboModule } from "react-native";
import { TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  printBill(
    ipAddress: string,
    port: string,
    escposBytes: number[],
    callback: (error: string | null, success: boolean) => void
  ): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>("NativeWifiPrinter");
