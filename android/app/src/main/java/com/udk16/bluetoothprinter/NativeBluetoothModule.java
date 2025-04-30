package com.udk16.bluetoothprinter;

import android.content.Context;
import com.facebook.react.bridge.ReactApplicationContext;
import com.printer.NativeBluetoothConnectionSpec;
import com.facebook.react.bridge.ReadableArray;
import android.util.Log;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.UnknownHostException;
import java.net.Socket;
import android.widget.Toast;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import android.companion.CompanionDeviceManager;
import java.util.concurrent.Executor;
import java.util.Map;
import java.util.HashMap;
import android.content.IntentSender;
import android.companion.AssociationInfo;
import java.lang.CharSequence;
import android.companion.BluetoothDeviceFilter;
import android.companion.AssociationRequest;
import android.os.Bundle;
import android.app.Activity;
import android.bluetooth.BluetoothAdapter;  // Import BluetoothAdapter
import android.bluetooth.BluetoothDevice; // Import BluetoothDevice
import java.util.Set; 

class NativeBluetoothModule extends NativeBluetoothConnectionSpec{
public static final String NAME = "NativeBluetoothConnection";
private final ReactApplicationContext reactContext;
private static final int SELECT_DEVICE_REQUEST_CODE = 123;
  public NativeBluetoothModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return NAME;
  }
  @Override
public void getPairedDevices(Promise promise){
     BluetoothAdapter bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        if (bluetoothAdapter == null) {
            promise.reject("BLUETOOTH_UNAVAILABLE", "Bluetooth is not supported on this device.");
            return;
        }

        if (!bluetoothAdapter.isEnabled()) {
            promise.reject("BLUETOOTH_DISABLED", "Bluetooth is disabled.");
            return;
        }

        Set<BluetoothDevice> pairedDevices = bluetoothAdapter.getBondedDevices();
        if (pairedDevices.size() > 0) {
            // Convert the set of BluetoothDevice objects to a JSON array
            // to pass back to React Native.
            StringBuilder deviceList = new StringBuilder();
            for (BluetoothDevice device : pairedDevices) {
                deviceList.append(device.getName()).append(":").append(device.getAddress()).append(",");
            }
             if (deviceList.length() > 0) {
                deviceList.deleteCharAt(deviceList.length() - 1); // Remove the last comma
             }
            promise.resolve(deviceList.toString());
        } else {
            promise.resolve(""); // Return empty string if no devices are paired
        }
    }

   @Override
   public void printEscPos(String macAddress, String uuid, ReadableArray commands, Promise promise){   
    
    }
}