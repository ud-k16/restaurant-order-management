import type { TurboModule } from "react-native";
import { TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  discoverPrinters(): void;
  connectPrinter(ipAddress: string, port: string): void;
  sendRawData(base64EncodedEscpos: string): void;
  getPrinterStatus(): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>("WifiPrinter");
