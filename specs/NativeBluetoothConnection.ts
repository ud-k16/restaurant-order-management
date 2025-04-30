import type { TurboModule } from "react-native";
import { TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  /**
   * Sends ESC/POS commands to a Bluetooth printer.
   *
   * @param macAddress The MAC address of the Bluetooth printer.
   * @param uuid The UUID of the service to connect to (e.g., for SPP).
   * @param commands An array of numbers representing the ESC/POS commands.
   * @return A Promise that resolves with a success message or rejects with an error.
   */
  printEscPos(
    macAddress: string,
    uuid: string,
    commands: number[]
  ): Promise<string>;

  /**
   * gets the paired bluetooth devices list.
   *
   * @return A Promise that resolves with a list of Paired devices or empty string.
   */
  getPairedDevices(): Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  "NativeBluetoothConnection"
);
